import React, {Component} from 'react';
import Button from '../Components/button.js';

import './login-form.css';
class loginForm extends Component{

	loginClicked = () =>{
		const emailid = this.refs.emailid.value;
		const password =this.refs.password.value;
		this.props.loginClicked(emailid, password);
	}

	render(){
		const title = "|DELTA AIRLINES|";
		return(
			<div>
				<div className="title-styling">
					{title}	
				</div>
				<div className="title-styling small-font">
					we give the best!	
				</div>
				<div className="login-form">
					<div>
						<input ref="emailid" type="text" placeholder="emailid" value="pwani@buffalo.edu"/>
					</div>
					<div>
						<input ref="password" type="password" placeholder="password" value="pass"/>
					</div>	
					<div>	
						<h4>{this.props.message}</h4>
					</div>
					<div>
						{<Button buttonLabel={'Login'} buttonClicked={this.loginClicked}/>}
					</div>
				</div>
			</div>
			);
	};


} 

export default loginForm; 