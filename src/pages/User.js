import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Select,
  Box,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Container,
  Typography,
  DialogTitle,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import {
  getAllBookings,
  changeStatus,
  getTimeSlots,
  bookings,
  bookingsNull
} from '../services/admin/action';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const MySwal = withReactContent(Swal);

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phoneNumber', label: 'phoneNumber', alignRight: false },
  { id: 'TimeSlot', label: 'TimeSlot', alignRight: false },
  { id: 'bookingStaus', label: 'bookingStaus', alignRight: false },

  { id: 'Date', label: 'Date', alignRight: false },
  { id: '' }
];

const conditionalRowStyles = [
  {
    when: (row) => row.bookingStatus,
    style: (row) => ({ color: row.bookingStatus === 'confirmed' ? 'green' : 'red' })
  }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function User(props) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');

  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [page, setPage] = useState(0);
  const [edit, setEdit] = useState({});
  const [id, setID] = useState('');
  const [order, setOrder] = useState('asc');
  const [fromdate, setFromDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [openBookingPatient, setopenBookingPatient] = useState(false);
  const [tooDate, setTodate] = useState(new Date());
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [patientInfoBooking, setInfo] = useState({});
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [final, setFinalData] = useState({});
  const [setPending, setvaluePending] = useState('');

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber
    },
    {
      name: 'TimeSlot',
      selector: (row) => row.TimeSlot
    },
    {
      name: 'bookingStatus',
      selector: (row) => row.bookingStatus
    },

    {
      name: 'Date',
      cell: (row) => <span>{moment(row.Date).format('YYYY-MM-DD')}</span>
    },

    {
      name: 'Action',
      cell: (row) => (
        <Button variant="contained" onClick={(e) => opendialog(e, row)}>
          Change Status
        </Button>
      )
    }
  ];

  const [booking, setBookings] = useState([]);

  useEffect(() => {
    props.getAllBookings(sessionStorage.getItem('token'));
    props.bookingsNull();
  }, []);

  useEffect(() => {
    if (props.adminBookingStatus === true) {
      Swal.fire({
        title: 'Booking was Successfull',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          setName('');
          setPhone('');
          props.bookingsNull();
        }

        if (result.isDismissed) {
          setName('');
          setPhone('');
          props.bookingsNull();
        }
      });
    }
  }, [props.adminBookingStatus]);

  useEffect(() => {
    if (props.bookingStatus) {
      // setBookings(props.bookingList ? props.bookingList : []);
      const datass = [];

      if (props.bookingList && props.bookingList.length > 0) {
        props.bookingList.map((data) => {
          datass.push({
            id: data._id,
            name: data.name,
            phoneNumber: data.phoneNumber,
            TimeSlot: data.timeSlot,
            bookingStatus: data.Status,
            Date: data.Date
          });

          setBookings(datass);
          return 0;
        });
      }
    }
  }, [props.bookingList]);

  useEffect(() => {
    if (props.slotStatus) {
      setSlots(props.slotList ? props.slotList.timeSlotsInfo : []);

      console.log(props.slotList);
    }
  }, [props.slotList]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const opendialog = (e, row) => {
    console.log(row, 'rowww');
    setEdit(row);
    setID(row.id);
    setOpen(true);
    if (row.bookingStatus === 'confirmed') {
      setvaluePending('confirmed');
    } else if (row.bookingStatus === 'pending') {
      setvaluePending('pending');
    } else {
      setvaluePending('cancelled');
    }
  };

  const handleChangeStatus = (e) => {
    const datasss = edit;
    setvaluePending(e.target.value);

    if (e.target.value === 'confirmed') {
      const dataaa = {
        _id: datasss.id,
        name: datasss.name,
        Status: 'confirmed',
        Date: datasss.Date,
        phoneNumber: datasss.phoneNumber
      };
      setFinalData(dataaa);
    } else if (e.target.value === 'pending') {
      const dataaa = {
        _id: datasss.id,
        name: datasss.name,
        Status: 'pending',
        Date: datasss.Date,
        phoneNumber: datasss.phoneNumber
      };
      setFinalData(dataaa);
    } else {
      const dataaa = {
        _id: datasss.id,
        name: datasss.name,
        Status: 'cancelled',
        Date: datasss.Date,
        phoneNumber: datasss.phoneNumber
      };
      setFinalData(dataaa);
    }
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSubmit = () => {
    props.changeStatus(sessionStorage.getItem('token'), id, final);
    setOpen(false);
  };

  const handleChangeFromDate = (date) => {
    setFromDate(date);
  };

  const handleChangeToDate = (date) => {
    setTodate(date);
  };
  const handleCloseBoking = () => {
    setOpenBooking(false);
  };

  const handleBookingDate = (date) => {
    setBookingDate(date);
    props.getTimeSlots(date);
  };

  const handleOpenBooking = () => {
    setBookingDate(null);

    setOpenBooking(true);
    setSlots([]);
  };

  const handleCloseBokingPatient = () => {
    setopenBookingPatient(false);
  };
  const openBookingPatientModal = (e, data) => {
    setopenBookingPatient(true);
    setInfo(data);
  };

  const closeBooking = () => {
    setopenBookingPatient(false);
  };
  const handlePhone = (e) => {
    console.log(e);
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const book = () => {
    const payload = {
      name,
      service,
      phoneNumber,
      timeSlot: patientInfoBooking.time,
      date: moment(bookingDate).format('YYYY-MM-DD')
    };

    props.bookings(sessionStorage.getItem('token'), payload);
    setOpenBooking(false);
    setopenBookingPatient(false);
  };

  const handleChangeService = (e) => {
    setService(e.target.value);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Page title="User | Minimal-UI">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Bookings
              </Typography>
              <Button
                onClick={handleOpenBooking}
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Icon icon={plusFill} />}
              >
                Create Bookings
              </Button>
            </Stack>
            <DesktopDatePicker
              label="From Date"
              inputFormat="dd/MM/yyyy"
              value={fromdate}
              onChange={handleChangeFromDate}
              renderInput={(params) => <TextField {...params} />}
            />
            &ensp;
            <DesktopDatePicker
              label="To Date"
              inputFormat="dd/MM/yyyy"
              value={tooDate}
              onChange={handleChangeToDate}
              renderInput={(params) => <TextField {...params} />}
            />
            &ensp;
            <Button variant="contained" component={RouterLink} to="#">
              Filter
            </Button>
            <br />
            <br /> <br />
            <Card>
              {/* <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} /> */}

              {/* <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={booking.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {booking &&
                    booking.length > 0 &&
                    booking
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { _id, name, phoneNumber, timeSlot, isConfirmed, Date } = row;
                        console.log(row);
                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                {/* <Avatar alt={name} src={avatarUrl} /> */}
              {/* <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>
                            <TableCell align="left">{timeSlot}</TableCell>
                            <TableCell align="left">{isConfirmed ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="left">
                              {Date}
                              <Label
                                variant="ghost"
                                color={(status === 'banned' && 'error') || 'success'}
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar> */}

              {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}

              <DataTable
                columns={columns}
                data={booking}
                pagination
                conditionalRowStyles={conditionalRowStyles}
              />
            </Card>
          </Container>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Change Status</DialogTitle>
            <DialogContent>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={setPending}
                onChange={handleChangeStatus}
                style={{ width: 200 }}
              >
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancel</MenuItem>
              </Select>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openBooking}
            onClose={handleCloseBoking}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogContent>
              <h4>Create Bookings</h4>
              <br />

              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={bookingDate}
                  onChange={handleBookingDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <br />
                <br />
                {slots.length > 0 && <h4>available timeSlots</h4>}
                <table>
                  <tbody>
                    {slots.length > 0 &&
                      slots.map((data) => (
                        <tr>
                          <td>Time</td>
                          <td>&ensp;&ensp;&ensp;</td>
                          <td>{data.time}</td>
                          <td>
                            {data.isBooked ? (
                              <span style={{ color: 'red' }}>&ensp;&ensp;&ensp;Booked</span>
                            ) : (
                              <>
                                &ensp;&ensp;&ensp;
                                <Button onClick={(e) => openBookingPatientModal(e, data)}>
                                  Book{' '}
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </LocalizationProvider>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openBookingPatient}
            onClose={handleCloseBokingPatient}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogContent>
              Time &ensp;{patientInfoBooking.time}
              <br />
              Date &ensp;{moment(bookingDate).format('YYYY-MM-DD')}
              <br /> <br /> <br />
              <TextField label="Name" value={name} onChange={(event) => handleName(event)} />
              <br /> <br /> <br />
              <TextField
                label="Phone number"
                value={phoneNumber}
                onChange={(event) => handlePhone(event)}
              />
              <br />
              <br />
              <br />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeService}
                style={{ width: 220 }}
              >
                <MenuItem value="consultation">consultation</MenuItem>
                <MenuItem value="toothfilling">Tooth filling</MenuItem>
                <MenuItem value="rootcanaltreatment">Root canal treatment</MenuItem>
                <MenuItem value="dentures">Dentures</MenuItem>
                <MenuItem value="implant">Implant</MenuItem>
                <MenuItem value="crownandbridges">Crown and Bridges</MenuItem>
                <MenuItem value="toothextraction">tooth extraction</MenuItem>
                <MenuItem value="scalingandpolishing">Scaling and Polishing</MenuItem>
              </Select>
              <br />
              <br />
              <Button disabled={phoneNumber.length !== 10} onClick={book}>
                Book{' '}
              </Button>
              <Button onClick={closeBooking}>Close </Button>
            </DialogContent>
          </Dialog>
        </Page>
      </LocalizationProvider>
    </>
  );
}

const mapStateToProps = ({ adminReducer }) => {
  const { bookingStatus, bookingList, slotStatus, slotList, adminBookingStatus } = adminReducer;

  return {
    bookingStatus,
    bookingList,
    slotStatus,
    slotList,
    adminBookingStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllBookings: (token) => dispatch(getAllBookings(token)),
  changeStatus: (token, id, data) => dispatch(changeStatus(token, id, data)),
  getTimeSlots: (date) => dispatch(getTimeSlots(date)),
  bookings: (token, data) => dispatch(bookings(token, data)),
  bookingsNull: () => dispatch(bookingsNull())
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
