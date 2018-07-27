import React, { Component } from 'react';

import Daily from './Daily'
import UserSelector from './UserSelector'
import PeriodSelector from './PeriodSelector'
import MonthlySelector from './MonthlySelector'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import _ from 'lodash';

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
    this.handleMonthChange = this.handleMonthChange.bind(this);
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

  handleMonthChange(date){
    this.props.onMonthChange(date);
  }

  render(){
    const { classes } = this.props;
    let data= this.props.data;
    let dataObj=_.groupBy(data, 'marked_by');
    let mode = this.props.mode;
    let content = null;
    switch(mode){
      case "User":
        content=<UserSelector data={Object.keys(dataObj)} current={this.props.conf.user} onChange={this.handleUserChange}/>
        break;
      case "Monthly":
        content=<MonthlySelector onChange={this.handleMonthChange} currentMonth={this.props.conf.month} />
        break;
      case "Period":
        content=<PeriodSelector onChange={this.handlePeriodChange} current={this.props.conf.period}/>
        break;
      case "Daily":
        content=<Daily style={{overflowX: 'hidden'}} currentDate={this.props.conf.date} onChange={this.handleDateChange}/>
        break;
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
            {content}
          </div>
        </CardContent>
      </Card>
      </div>
    )
  }
}

export default withStyles(styles) (LeftPane)
