import React,{Component} from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class UserSelector extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = event => {
    this.props.onChange(event.target.value);
  };
  render(){
    return(
      <FormControl>
          <InputLabel htmlFor="age-auto-width">User</InputLabel>
          <Select
            value={this.props.current}
            onChange={this.handleChange}
            input={<Input name="user" />}
            autoWidth
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {this.props.data.map((element)=>{
              return <MenuItem key={element} value={element}>{element}</MenuItem>
            })}
          </Select>
          <FormHelperText>Please select a user from the list</FormHelperText>
        </FormControl>
    )
  }
}

export default UserSelector
