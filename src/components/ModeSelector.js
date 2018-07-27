import React,{Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

/*
* Mode Selector class
*/

const MODES=["Daily","Monthly","User","Period"];
class ModeSelector extends Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event,value){
      this.props.onhandleChange(value);
  }

  render(){
      let modes = MODES;
      return(
        <Paper>
          <Tabs
              value={this.props.mode}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered>
              {modes.map(mode=>{
                return <Tab label={mode} value={mode}/>
              })}
            </Tabs>
        </Paper>
      );
  }
}

export default ModeSelector;
