import React, { Component } from 'react';
import _ from 'lodash';

import Header from './components/Header'
import ModeSelector from './components/ModeSelector'
import Board from './components/Board'
import './App.css';





class App extends Component {

  constructor(props){
    super(props);
    this.state={
        mode : "Daily",
        attendances : {}
    }
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange(value){
    this.setState({
      mode : value
    })
  }

  componentDidMount(){
     fetch('http://192.168.1.190/api/attendance')
     .then(results=>{
       return results.json();
     }).then(data => {
       let dataObj=_.groupBy(data, 'marked_by');
       this.setState({ attendances: dataObj });

     });
  }


  render() {

    return (
      <div>
        <Header/><br/>
        <ModeSelector mode={this.state.mode} onhandleChange={this.handleModeChange} /><br/>
        <Board mode={this.state.mode} data={this.state.attendances} />
      </div>
    );
  }
}

export default App;
