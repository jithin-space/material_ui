import React,{Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

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

class DailyStatus extends Component{
  render(){
    const data = this.props.data;
    const { classes } = this.props;
    return(<div className={classes.tableWrapper}><Table >
        <TableHead>
          <TableRow>
            <TableCell>Resource Person</TableCell>
            <TableCell>Slot 1</TableCell>
            <TableCell>Slot 2</TableCell>
            <TableCell>Slot 3</TableCell>
            <TableCell>Slot 4</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map(n => {
            return (
              <TableRow  key={n}>
                <TableCell component="th" scope="row">
                  {n}
                </TableCell>
                <TableCell>{('slot1' in data[n])?(data[n]['slot1'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell >{('slot2' in data[n])?(data[n]['slot2'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell >{('slot3' in data[n])?(data[n]['slot3'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell>{('slot4' in data[n])?(data[n]['slot4'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell >{_.reduce(data[n],function(sum,element){
                  return sum+element.length;
                },0)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table></div>);
  }
}

export default withStyles(styles) (DailyStatus)
