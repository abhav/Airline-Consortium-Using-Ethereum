import React, {Component} from 'react';
import Header from '../Components/header.js';
import Body from '../Components/body.js';

class Homepage extends Component{

	REQUEST = "REQUEST";
	NOTIFICATIONS = "NOTIFICATIONS";
	NOTIFICATION_CONTENT = null;
	AIRLINE = 'Delta Airlines';

	constructor(props){
		super(props);
		this.state = {
			display : this.REQUEST
		}
	}
	
	requestClicked = () =>{
		this.setState((prev) => ({display:this.REQUEST}));
	}

	notificationsClicked = () =>{
		const airline = this.AIRLINE;
		fetch('http://localhost:5005/getNotifications', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				airline : airline
			})
		})
		.then(res=>res.json())
		.then(data=>{
				console.log(`HomePage.js : status ${data.status}`)
				this.NOTIFICATION_CONTENT = data; 
				this.setState((prev) => ({display:this.NOTIFICATIONS}))
			}
		)
		
	}

	render(){
	    const header = <Header 
	    					customerid = {this.props.memberDetails.customerid}
	    					firstname = {this.props.memberDetails.firstname}
	    					lastname = {this.props.memberDetails.lastname}
	    					logoutClicked = {this.props.logoutClicked}
	    					requestClicked	= {this.requestClicked}
	    					notificationsClicked = {this.notificationsClicked}
	    					currentSelection = {this.state.display}
	    				/>
	    const body = <Body display={this.state.display} notificationContent={this.NOTIFICATION_CONTENT}/>

		return(
					<div>
						{header}
						<div>SPACE</div>
						<div>SPACE</div>
						{body}
					</div>
				);
	}		
}

export default Homepage;