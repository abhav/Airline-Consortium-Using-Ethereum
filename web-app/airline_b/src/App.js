import React, { Component } from 'react';
import LoginForm from './Containers/loginForm.js'
import Homepage from './Containers/Homepage.js'

import './App.css';
class App extends Component {
  
  FRESH = "FRESH";
  VALID_USER = "VALID_USER";
  INVALID_USER = "INVALID_USER";

  ERROR = 'ERROR';
  DATABASE_ERROR = 'DATABASE_ERROR';
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR';
  DISPLAY_MESSAGE = 'INITIAL_DISPLAY_MESSAGE';

  USER_DETAILS  = null;

  constructor(){
    super();
    this.state = {
      display: 'FRESH'
    }
  }

  loginClicked = (emailid, password) => {
    fetch('http://localhost:5000/login', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                emailid : emailid,
                password : password
            })
    })
    .then((res)=>res.json())
    .then(data=>{
            console.log("data: "+data.status);
            switch(data.status)
            {
              case this.VALID_USER:
                this.USER_DETAILS = data;
                this.setState((prev)=>({display:this.VALID_USER}));
              break;
              case this.INVALID_USER:
                this.DISPLAY_MESSAGE = this.INVALID_USER;
                this.setState((prev)=>({display:this.ERROR}));
              break;
              case this.DATABASE_ERROR:
                this.DISPLAY_MESSAGE = this.DATABASE_ERROR;
                this.setState((prev)=>({display:this.ERROR}));
              break;
              default:
                this.DISPLAY_MESSAGE = this.UNEXPECTED_ERROR;
                this.setState((prev)=>({display:this.ERROR}));
              break;
            }
    })

  }

  logoutClicked = () =>{
    this.setState((prev)=>({display:this.FRESH}));
  }

  render() { 
    let message = '';
    console.log("Current display : "+this.state.display)
    switch(this.state.display){
      case this.FRESH:
        return (
                <div className='form-position'>
                  {<LoginForm message={message} loginClicked={this.loginClicked}/>}         
                </div>
              );
      break;

      case this.VALID_USER:
        return(
                <div>
                  {<Homepage memberDetails={this.USER_DETAILS} logoutClicked={this.logoutClicked}/>}
                </div>
              );
      break;

      case this.ERROR:
        message = this.DISPLAY_MESSAGE;
        return (
                <div className='form-position'>
                  {<LoginForm message={message} loginClicked={this.loginClicked}/>}
                </div>
              );
      break;
    }
    
  }
}

export default App;
