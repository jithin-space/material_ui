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
      month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      period :{
        from : new Date(new Date().getFullYear(), 0, 1),
        to : new Date()
      }
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
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

  handleMonthChange(month){
    this.setState({
      month: month
    })
  }

  handleModeChange(mode,value){

  (mode==="User")?this.setState({ user : value}):this.setState({month: value });
    this.props.onhandleChange(mode);
  }
  render(){

    return(
      <Grid container xs={12} spacing={8} margin={0}>
        <Grid item xs={2} >
            <Paper >
              <LeftPane mode={this.props.mode} data={this.props.data} conf={this.state}
                onDateChange={this.handleDateChange}
                onUserChange={this.handleUserChange}
                onPeriodChange={this.handlePeriodChange}
                onMonthChange={this.handleMonthChange}/>
            </Paper>
          </Grid>
          <Grid item xs={10} >
            <Paper>
              <RightPane mode={this.props.mode}
                 conf={this.state}
                  data={this.props.data}
                  onMonthChange={this.handleMonthChange}
                   onModeChange={this.handleModeChange}/>
            </Paper>
          </Grid>
      </Grid>
    )
  }
}

export default Board
