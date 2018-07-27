import React,{Component} from 'react'
import DailyStatus from './DailyStatus'
import UserStatus from './UserStatus'
import PeriodStatus from './PeriodStatus'
import MonthlyStatus from './MonthlyStatus'
import moment from 'moment'
import _ from 'lodash'

class RightPane extends Component{

  constructor(props){
    super(props);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleModeChange(mode,value){
    this.props.onModeChange(mode,value);
  }
  handleMonthChange(mode,user){
    this.props.onMonthChange(mode,user);
  }

  render(){
    let mode = this.props.mode;
    let daily=null;
    var dataObj = this.props.data;
     let data=_.groupBy(dataObj, 'marked_by');
    if(mode==="Daily"){

      var date = moment(this.props.conf.date).format('DD/MM/YYYY');
      var pholder={};
      var output={};
      _.forEach(Object.keys(data),function(user){

        pholder=_.groupBy(_.filter(data[user],['attendance_on',date]),(o =>(o.slot)));
        if(Object.keys(pholder).length > 0){
          output[user]= pholder;
        }
      })


     daily = <DailyStatus date={this.props.conf.date} data={output} />
   }else if(mode === "User"){
     let user = this.props.conf.user;
     let userData = (user)?data[this.props.conf.user]: dataObj;
     daily = <UserStatus user={user} data={userData}/>
   }else if(mode === "Period"){
     daily = <PeriodStatus period={this.props.conf.period} data={data}
              onModeChange={this.handleModeChange}/>
   }else if(mode === "Monthly"){
     daily = <MonthlyStatus month={this.props.conf.month} data={data}
              onMonthChange={this.handleMonthChange}/>
   }

    return(<div>
      {daily}
    </div>

    )
  }
}

export default RightPane
