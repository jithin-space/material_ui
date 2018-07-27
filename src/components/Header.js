import React,{Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

/*
* Header of the Application
*/
class Header extends Component{
  render(){
    return(
        <AppBar position="static" color="default">
               <Toolbar>
                 <Typography variant="title" color="inherit">
                   SPIN Attendance Monitoring System
                 </Typography>
               </Toolbar>
             </AppBar>
    )
  }
}

export default Header
