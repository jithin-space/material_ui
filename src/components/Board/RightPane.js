import React,{Component} from 'react'
import DailyStatus from './DailyStatus'
import UserStatus from './UserStatus'
import PeriodStatus from './PeriodStatus'
import moment from 'moment'
import _ from 'lodash'

class RightPane extends Component{

  render(){
    let mode = this.props.mode;
    let daily=null;
    if(mode==="Daily"){
      var data = this.props.data;
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
     let userData = (user)?this.props.data[this.props.conf.user]: this.props.data;
     daily = <UserStatus user={user} data={userData}/>
   }else if(mode === "Period"){
     daily = <PeriodStatus period={this.props.conf.period} data={this.props.data} />
   }
    return(<div>
      {daily}
    </div>

    )
  }
}

export default RightPane
