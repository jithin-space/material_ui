import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment'
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#5DA5DA','#60BD68','#F17CB0','#B276B2',
'#B2912F','#DECF3F','#F15854'];

class MonthlyStatus extends Component {

   constructor(props){
     super(props);
     this.handleChange = this.handleChange.bind(this);
     this.state = {
        value: '',
      };
   }

   handleChange = (event, value) => {
      this.props.onMonthChange(new Date(moment('01/'+value,'DD/MM/YYYY')));
  };

    render() {
        let srcData = this.props.data;
        let lines = {};
        let resultArray = {};
        let groups={};
        let entry=[];

        // get the data as array of Users
        // each contains their data grouped by month
        _.forEach(srcData, function(user) {
              groups = _.groupBy(user, function(element) {
               user = element.marked_by;
               var dateElements = element.attendance_on.split('/');
               return dateElements[1] + '/' + dateElements[2];
           })

           entry = Object.keys(groups).map((key, index) => {
               return [key, groups[key].length]
           })
           resultArray[user] = entry;
       });

       // reduce the array to get the entire result grouped by Month
       // each consist of list of [user,count] value
       groups = _.reduce(resultArray, function(period, value, key) {
           _.forEach(value, function(keyIn) {
                   var dur = keyIn[0];
                   (period[dur] || (period[dur] = []))[key] = keyIn[1];
               })

           return period;
       }, {});

       var numUsers = Object.keys(resultArray).length;
       var defaultSet = _.zipObject(Object.keys(resultArray), new Array(numUsers).fill(0));
       var result = {};

       //make each duration has a list of all users found in the result Array
       // for better processing
       _.forEach(groups, function(key, value) {
           var tem = _.assignIn({}, defaultSet);
           result[value] = _.assignIn(tem, groups[value]);
       })

       // sort the durations from latest to oldest
       var dataLabels = _.sortBy(Object.keys(result), function(key, value) {
           return (new moment('01/' + key).format('YYYYMMDD'));
       });

       // define each sector in the pie chart that needs to be generated
       var linesOut = dataLabels.map(element => {
           var output = Object.keys(groups[element]).map((el,index) => {
               return ({
                   name: el,
                   value: groups[element][el],
                   fill: COLORS[index % COLORS.length]
               })
           });
         return {key: element, value: output};
       })
       // get the date from DD/MM/YYYY format to MM/YYYY
        let value= moment(this.props.month).format('DD/MM/YYYY').split('/').slice(1).join('/');
        // render the output
        return (<div>
          <Tabs
            value={value}
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
                return (value === element && <TabContainer><CustomPie data={_.filter(linesOut,['key',element])[0]}/></TabContainer>);
            })
          }
        </div>);
        }
    }
    export default MonthlyStatus
