import React,{Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash';





class DailyStatus extends Component{
  render(){

    const data = this.props.data;


    return(<Table >
        <TableHead>
          <TableRow>
            <TableCell>Resource Person</TableCell>
            <TableCell numeric>Slot 1</TableCell>
            <TableCell numeric>Slot 2</TableCell>
            <TableCell numeric>Slot 3</TableCell>
            <TableCell numeric>Slot 4</TableCell>
            <TableCell numeric>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map(n => {
            return (
              <TableRow  key={n}>
                <TableCell component="th" scope="row">
                  {n}
                </TableCell>
                <TableCell numeric>{('slot1' in data[n])?(data[n]['slot1'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell numeric>{('slot2' in data[n])?(data[n]['slot2'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell numeric>{('slot3' in data[n])?(data[n]['slot3'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell numeric>{('slot4' in data[n])?(data[n]['slot4'].map(a => a.s_name)).join('&'):''}</TableCell>
                <TableCell numeric>{_.reduce(data[n],function(sum,element){
                  return sum+element.length;
                },0)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>);
  }
}

export default DailyStatus
