import React from 'react';
import Button from './button.js'
import './header.css';
const header = (props) => {

	let requestChangeClicked = false;
	let notificationsClicked = false;
	if(props.currentSelection == 'REQUEST'){
		requestChangeClicked = true;
	}
	else if(props.currentSelection == 'NOTIFICATIONS'){
		notificationsClicked = true;
	}
	console.log('requestChangeClicked: '+requestChangeClicked);
	console.log('notificationsClicked: '+notificationsClicked);
	return(
		<div>
			<div className="header"> 
				<div className="left-margin-20  glow-blue">
					Kingfisher Airlines
				</div>
				<div className="set-auto-margin pn-right-margin">
					{props.lastname}, {props.firstname}
				</div>

				<div className="side-margin5">
					<Button buttonLabel={'Request'}
							buttonValue={'No value yet'}
							buttonClicked = {props.requestClicked}
							selected = {requestChangeClicked}
					/>
				</div>
				<div className="side-margin5">
					<Button buttonLabel={'Notifications'}
							buttonValue={'No value yet'}
							buttonClicked = {props.notificationsClicked}
							selected = {notificationsClicked}
					/>
				</div>
				<div className="side-margin5 right-margin">
					<Button buttonLabel={'Logout'}
							buttonValue={'No value yet'}
							buttonClicked = {props.logoutClicked}
					/>
				</div>
			</div>
		</div>
		);
}
export default header;