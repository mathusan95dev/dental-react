import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { filter, values } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment, { duration } from 'moment';
// material
import {
  Card,
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import { getSettings, editSetting } from '../services/admin/action';

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

function User(props) {
  const [values, setRows] = useState([]);
  const [editrows, setEditRow] = useState([]);
  const [openSettingEdit, setopenSettingEdit] = useState(false);

  useEffect(() => {
    props.getSettings(sessionStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (props.settingList && props.settingList[0] && props.settingList.length > 0) {
      console.log(props.settingList[0].Monday.startingtime, 'eerre');
      const final = [];

      final.push(
        createData(
          'Monday',
          props.settingList[0].Monday.startingtime,
          props.settingList[0].Monday.nooftimeslots,
          props.settingList[0].Monday.duration
        )
      );

      final.push(
        createData(
          'Tuesday',
          props.settingList[0].Tuesday.startingtime,
          props.settingList[0].Tuesday.nooftimeslots,
          props.settingList[0].Tuesday.duration
        )
      );

      final.push(
        createData(
          'Wednesday',
          props.settingList[0].Wednesday.startingtime,
          props.settingList[0].Wednesday.nooftimeslots,
          props.settingList[0].Wednesday.duration
        )
      );

      final.push(
        createData(
          'Thursday',
          props.settingList[0].Thursday.startingtime,
          props.settingList[0].Thursday.nooftimeslots,
          props.settingList[0].Thursday.duration
        )
      );

      final.push(
        createData(
          'Friday',
          props.settingList[0].Friday.startingtime,
          props.settingList[0].Friday.nooftimeslots,
          props.settingList[0].Friday.duration
        )
      );

      final.push(
        createData(
          'Saturday',
          props.settingList[0].Saturday.startingtime,
          props.settingList[0].Saturday.nooftimeslots,
          props.settingList[0].Saturday.duration
        )
      );

      final.push(
        createData(
          'Sunday',
          props.settingList[0].Sunday.startingtime,
          props.settingList[0].Sunday.nooftimeslots,
          props.settingList[0].Sunday.duration
        )
      );

      console.log(final, 'eerre');

      setRows(final);
    }
  }, [props.settingList]);

  function createData(day, startingtime, noofslots, duration) {
    console.log(startingtime, 'dayyayaya');
    return { day, startingtime, noofslots, duration };
  }

  const handleClose = () => {
    setopenSettingEdit(false);
    setEditRow([]);
  };

  const handleOpenModal = (e, rowss) => {
    const datasss = [];
    datasss.push({
      dayss: rowss.day,
      durations: rowss.duration,
      noofslot: rowss.noofslots,
      startingtimes: rowss.startingtime
    });

    console.log(datasss);
    setEditRow(datasss);
    setopenSettingEdit(true);
  };

  const changeValue = (e, checker) => {
    console.log(editrows, 'checkerr');
    const datas = [...editrows];
    console.log(datas, 'cjkkjj');
    if (checker === 'startingtime') {
      datas[0].startingtimes = e.target.value;
      console.log(2);
    }
    if (checker === 'noofslots') {
      datas[0].noofslot = e.target.value;
    }
    if (checker === 'duration') {
      datas[0].durations = e.target.value;
      console.log(3);
    }

    setEditRow(datas);
  };

  const handleSubmit = () => {
    const payload = {
      dayname: editrows[0].dayss,
      nooftimeslots: editrows[0].noofslot,
      duration: editrows[0].durations,
      startingtime: editrows[0].startingtimes
    };
    setopenSettingEdit(false);

    props.editSetting(sessionStorage.getItem('token'), payload);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Page title="User | Minimal-UI">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Settings
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Icon icon={plusFill} />}
              >
                Create Settings
              </Button>
            </Stack>

            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell align="right">StartingTime</TableCell>
                      <TableCell align="right">No of Slots</TableCell>
                      <TableCell align="right">Duration</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.map((row) => (
                      <TableRow
                        key={row.day}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.day}
                        </TableCell>
                        <TableCell align="right">{row.startingtime}</TableCell>
                        <TableCell align="right">{row.noofslots}</TableCell>
                        <TableCell align="right">{row.duration}</TableCell>
                        <TableCell align="right">
                          <Button onClick={(e) => handleOpenModal(e, row)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Container>

          <Dialog
            open={openSettingEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogContent>
              <TableContainer component={Paper}>
                <h4>{editrows[0] ? editrows[0]?.dayss : ''}</h4>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>StartingTime </TableCell>
                      <TableCell>No of Slots</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          value={editrows[0] ? editrows[0]?.startingtimes : ''}
                          onChange={(e) => changeValue(e, 'startingtime')}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editrows[0] ? editrows[0].noofslot : ''}
                          onChange={(e) => changeValue(e, 'noofslots')}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editrows[0] ? editrows[0]?.durations : ''}
                          onChange={(e) => changeValue(e, 'duration')}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={handleClose}>Close </Button>
            </DialogContent>
          </Dialog>
        </Page>
      </LocalizationProvider>
    </>
  );
}

const mapStateToProps = ({ adminReducer }) => {
  const { settingList } = adminReducer;
  return {
    settingList
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSettings: (token) => dispatch(getSettings(token)),
  editSetting: (token, data) => dispatch(editSetting(token, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
