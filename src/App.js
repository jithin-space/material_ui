import React, { Component } from 'react';
import Header from './components/Header'
import ModeSelector from './components/ModeSelector'
import CustomizedSnackbars from './components/CustomizedSnackbars'
import Board from './components/Board'
import './App.css';

/*
* Main Application class
*/
class App extends Component {

  constructor(props){
    super(props);
    this.state={
        mode : "Daily",
        attendances : {}
    }
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  // when mode changes
  handleModeChange(mode){
    this.setState({
      mode : mode
    })
  }
  // when component is mounted
  componentDidMount(){
     fetch('http://192.168.1.190/api/attendance')
     .then(results=>{
       return results.json();
     }).then(data => {
       this.setState({ attendances: data });
     });
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        {/* <Header/><br/> */}
        <CustomizedSnackbars/>
        <ModeSelector mode={this.state.mode} onhandleChange={this.handleModeChange} /><br/>
        <Board mode={this.state.mode} data={this.state.attendances} onhandleChange={this.handleModeChange} />
      </div>
    );
  }
}

export default App;
