import React, {
    Component
} from 'react';
import _ from 'lodash';
import moment from 'moment'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector,
    Cell
} from 'recharts';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CustomPie from './CustomPie'


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 , height: '50vh'}}>
      {props.children}
    </Typography>
  );
}



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class UserStatus extends Component {

   constructor(props){
     super(props);
     this.handleChange = this.handleChange.bind(this);
     this.state = {
        value: '',
      };
   }

   handleChange = (event, value) => {
    this.setState({ value });
  };

    render() {
        let ab = this.props.data;
        var data = {};
        var lines = {};
        if (this.props.user) {
            let resultObj = _.groupBy(ab, function(element) {
                var dateElements = element.attendance_on.split('/');
                return dateElements[1] + '/' + dateElements[2];
            });

            var series_data = Object.keys(resultObj).map(function(key, index) {
                return ({
                    name: key,
                    value: resultObj[key].length
                })
            });

            data = _.sortBy(series_data, function(element) {

                return (new moment('01/' + element['name']).format('YYYYMMDD'));
            });

            lines =  <ResponsiveContainer width="90%" height={400}><LineChart width="100%" height="80%" data={data} margin={{ top: 10, right: 10, bottom: 5, left: 5 }}>
              <XAxis dataKey="name" type="category" interval="0" />
              <YAxis/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth="5" activeDot={{r: 15}} dot={{ stroke: 'red', strokeWidth: 5 }}>
                <LabelList dataKey="value" position="top" />
              </Line>
            </LineChart></ResponsiveContainer>

        } else {
            var resultArray = {};
            var user = null;
            let allResults = _.forEach(ab, function(user) {
                var temp = _.groupBy(user, function(element) {
                    user = element.marked_by;
                    var dateElements = element.attendance_on.split('/');
                    return dateElements[1] + '/' + dateElements[2];
                })

                var test = Object.keys(temp).map((key, index) => {
                    return [key, temp[key].length]
                })
                resultArray[user] = test;
            });

            var temp = _.reduce(resultArray, function(period, value, key) {
                _.forEach(value, function(keyIn) {
                        var dur = keyIn[0];
                        (period[dur] || (period[dur] = []))[key] = keyIn[1];
                    })

                return period;
            }, {});

            var numUsers = Object.keys(resultArray).length;
            var defaultSet = _.zipObject(Object.keys(resultArray), new Array(numUsers).fill(0));

            var result = {};

            _.forEach(temp, function(key, value) {
                var tem = _.assignIn({}, defaultSet);
                result[value] = _.assignIn(tem, temp[value]);
            })

            var dataLabels = _.sortBy(Object.keys(result), function(key, value) {
                return (new moment('01/' + key).format('YYYYMMDD'));
            });
            var linesOut = dataLabels.map(element => {
                var output = Object.keys(temp[element]).map((el,index) => {
                    return ({
                        name: el,
                        value: temp[element][el],
                        fill: COLORS[index % COLORS.length]
                    })
                });
              return {key: element, value: output};
            })
             let value=dataLabels[0];
            lines =  <div>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
              >
                {
                  dataLabels.slice(0).reverse().map(element=>{
                    return <Tab label={element} value={element} />
                  })
                }
              </Tabs>

              {
                dataLabels.slice(0).reverse().map(element=>{

                  if(this.state.value===''){
                      this.setState({
                        value:dataLabels.slice(0).reverse()[0]
                      })
                  }else{
                    return (this.state.value === element && <TabContainer><CustomPie data={_.filter(linesOut,['key',element])[0]}/></TabContainer>);
                  }

                })
              }
            </div>

        }

            return ( <div>
              {lines}
            </div>
            )
        }
    }

    export default UserStatus
