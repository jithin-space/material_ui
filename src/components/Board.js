import React,{Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import LeftPane from './Board/LeftPane'
import RightPane from './Board/RightPane'
class Board extends Component{

  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      user : '',
      period :{
        from : new Date(new Date().getFullYear(), 0, 1),
        to : new Date()
      }
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
  }

  handleDateChange(date){
    this.setState({
      date: date
    })
  }

  handleUserChange(user){
    this.setState({
      user : user
    })
  }
  handlePeriodChange(values){
    this.setState({
      period: values
    })
  }
  render(){
    return(
      <Grid container xs={12} spacing={24}>
        <Grid item xs={2} >
            <Paper align='center'>
              <LeftPane mode={this.props.mode} data={this.props.data} conf={this.state}
                onDateChange={this.handleDateChange}
                onUserChange={this.handleUserChange}
                onPeriodChange={this.handlePeriodChange}/>
            </Paper>
          </Grid>
          <Grid item xs={10} >
            <Paper>
              <RightPane mode={this.props.mode} conf={this.state} data={this.props.data}/>
            </Paper>
          </Grid>
      </Grid>
    )
  }
}

export default Board
