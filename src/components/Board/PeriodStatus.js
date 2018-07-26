import React,{Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';
import moment from 'moment'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class PeriodStatus extends Component{

  constructor(props){
    super(props);
    this.state={
      page: 0,
     rowsPerPage: 5
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
   this.setState({ rowsPerPage: event.target.value });
 };

  render(){

 const { classes } = this.props;
 const { rowsPerPage, page } = this.state;

    let ab = this.props.data;

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


            var output = Object.keys(result[element]).map((el,index) => {
                return ({
                    name: el,
                    value: temp[element][el]
                })
            });


          return {key: element, value: output};

        })

        var dateFromElements = moment(this.props.period.from).format('YYYYMMDD');
        var dateToElements = moment(this.props.period.to).format('YYYYMMDD');

let tax =_.filter(linesOut,function(element){


  let current = moment('01/'+element.key,'DD/MM/YYYY').format('YYYYMMDD');

  return (current >= dateFromElements && current <= dateToElements);

});
var rest={};



var rest =tax.map(n => {
  return ({ name: n.key,
            value: Object.keys(resultArray).map(element=>{

              return { name: element,
                       value:  _.filter(n.value,['name',element])[0].value}

            })

  });
})

function getCount(period,user){
  return (rest.find(o=> o.name === period)).value.find(e=> e.name== user).value;
}










var user=[];


return(<div className={classes.tableWrapper}><Table >
    <TableHead>
      <TableRow>
        <TableCell>User</TableCell>

        {Object.keys(resultArray).map(element=>{
          var include = false;
          _.forEach(tax,function(e){
              if(getCount(e.key,element)> 5){
                include=true;
              }
          });
          if(include==true){
            user.push(element);
            return <TableCell numeric>{element}</TableCell>
          }
        })}

      </TableRow>
    </TableHead>
    <TableBody>

      {tax.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
        return (
          <TableRow  key={n.id}>
            <TableCell  scope="row">
              {n.key}
            </TableCell>

            {user.map(element=>{
              return <TableCell numeric>{getCount(n.key,element)}</TableCell>
            })}

          </TableRow>
        );
      })}
    </TableBody>
    <TableFooter>
         <TableRow>
           <TablePagination
             colSpan={3}
             count={tax.length}
             rowsPerPage={rowsPerPage}
             page={page}
             onChangePage={this.handleChangePage}
             onChangeRowsPerPage={this.handleChangeRowsPerPage}
           />
         </TableRow>
       </TableFooter>
  </Table></div>);
  }
}

export default withStyles(styles) (PeriodStatus)
