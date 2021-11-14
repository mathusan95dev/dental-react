import { useEffect, useState } from 'react';
import moment from 'moment';
import { merge } from 'lodash';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, MenuItem, Select } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { fetchGraphData } from '../../../services/admin/action';

// ----------------------------------------------------------------------

function AppWebsiteVisits() {
  const [graphData, setGraph] = useState([]);
  const [intial, setInitaisl] = useState('today');
  const [labels, setlabel] = useState([]);
  const [valuess, setvalues] = useState([]);

  const dispatch = useDispatch();

  // const data = useSelector((state) => {
  //   if (state.adminReducer.graphData) {
  //     console.log(state, 'statte');
  //     setGraph(state.adminReducer.graphData);
  //   }
  // });

  const graph = useSelector((state) => state.adminReducer.graphData);

  const Options = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: labels
      }
    }
  };
  const Series = {
    series: [
      {
        name: 'series-1',
        data: valuess
      }
    ]
  };

  useEffect(() => {
    const first = moment(new Date()).format('MM-DD-YYYY');
    const last = moment(new Date()).format('MM-DD-YYYY');

    fetchGraphData(sessionStorage.getItem('token'), first, last, dispatch);
  }, []);

  useEffect(() => {
    if (graph && graph.length > 0) {
      const label = [];
      const value = [];

      graph.map((data) => label.push(data._id));
      graph.map((data) => value.push(data.count));

      setlabel(label);
      setvalues(value);
    } else {
      setlabel([]);
      setvalues([]);
    }
  }, [graph]);

  // const chartOptions = merge(BaseOptionChart(), {
  //   stroke: { width: [0, 2, 3] },
  //   plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
  //   fill: { type: ['solid', 'gradient', 'solid'] },
  //   labels: [
  //     '01/01/2003',
  //     '02/01/2003',
  //     '03/01/2003',
  //     '04/01/2003',
  //     '05/01/2003',
  //     '06/01/2003',
  //     '07/01/2003',
  //     '08/01/2003',
  //     '09/01/2003',
  //     '10/01/2003',
  //     '11/01/2003'
  //   ],
  //   xaxis: { type: 'datetime' },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: (y) => {
  //         if (typeof y !== 'undefined') {
  //           return `${y.toFixed(0)} visits`;
  //         }
  //         return y;
  //       }
  //     }
  //   }
  // });

  const handleChangeStatus = (e) => {
    setInitaisl(e.target.value);

    if (e.target.value === 'thisweek') {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay();
      const last = first + 6;

      const firstday = moment(new Date(curr.setDate(first))).format('MM-DD-YYYY');
      const lastday = moment(new Date(curr.setDate(last))).format('MM-DD-YYYY');

      fetchGraphData(sessionStorage.getItem('token'), firstday, lastday, dispatch);
    }

    if (e.target.value === 'today') {
      const first = moment(new Date()).format('MM-DD-YYYY');
      const last = moment(new Date()).format('MM-DD-YYYY');

      fetchGraphData(sessionStorage.getItem('token'), first, last, dispatch);
    }

    if (e.target.value === 'thismonth') {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);

      fetchGraphData(
        sessionStorage.getItem('token'),
        moment(firstDay).format('MM-DD-YYYY'),
        moment(lastDay).format('MM-DD-YYYY'),
        dispatch
      );
    }
  };
  return (
    <Card>
      <CardHeader title="Confirmed Bookings" />
      &ensp; &ensp;
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={intial}
        onChange={handleChangeStatus}
        style={{ width: 200 }}
      >
        <MenuItem value="today">today</MenuItem>
        <MenuItem value="thisweek">this week</MenuItem>
        <MenuItem value="thismonth">this month</MenuItem>
      </Select>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={Series.series} options={Options.options} height={364} />
      </Box>
    </Card>
  );
}

export default AppWebsiteVisits;
