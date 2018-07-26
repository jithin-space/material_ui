import React,{Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class ModeSelector extends Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event,value){
      this.props.onhandleChange(value);
  }
  render(){
    return(
      <Paper>
        <Tabs
            value={this.props.mode}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Daily" value="Daily"/>
            <Tab label="User" value="User"/>
            <Tab label="Period" value="Period" />
          </Tabs>
      </Paper>

    )
  }
}

export default ModeSelector;
