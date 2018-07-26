import React, { Component } from 'react';

import Daily from './Daily'
import UserSelector from './UserSelector'
import PeriodSelector from './PeriodSelector'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  card: {
    textAlign: 'left',
    minHeight: '40vh',
    paddingTop: '5vh'
  },
  content:{
    paddingRight: '10px',
    overflow: 'hidden',
    marginTop: '2vh'
  }

};



class LeftPane extends Component{

  constructor(props){
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
  }

  handleDateChange(date){
    this.props.onDateChange(date);
  }

  handleUserChange(value){
    this.props.onUserChange(value);
  }

  handlePeriodChange(value){
    this.props.onPeriodChange(value);
  }

  render(){
    const { classes } = this.props;
    let mode = this.props.mode;
    let daily = null;
    if(mode === "Daily"){
      daily=<Daily style={{overflowX: 'hidden'}} currentDate={this.props.conf.date} onChange={this.handleDateChange}/>
    }else if(mode === "User"){
      var users= Object.keys(this.props.data);
      daily=<UserSelector data={users} current={this.props.conf.user} onChange={this.handleUserChange}/>
    }else if(mode === "Period"){
      daily=<PeriodSelector onChange={this.handlePeriodChange} current={this.props.conf.period}/>
    }

    return(
      <div>

      <Toolbar>
        <Typography variant="title" color="inherit">
          View:{mode}
        </Typography>
      </Toolbar>

        <Card className={classes.card}>
        <CardContent >
          <Typography variant="subheading" align="left" gutterBottom >
            Please Select
          </Typography>
          <div className={classes.content}>
            {daily}
          </div>
        </CardContent>
      </Card>
      </div>


    )
  }
}

export default withStyles(styles) (LeftPane)
