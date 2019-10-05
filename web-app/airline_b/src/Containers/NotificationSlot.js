import React, { Component } from 'react';
import './notification-slot.css';
import Button from '../Components/button.js';

class NotificationSlot extends Component{
	
	//PENDING = 'PENDING';
	RESPONDED = 'RESPONDED';
	ACCEPTED = 'ACCEPTED';
	REJECTED = 'REJECTED';
	RESPONSE = this.props.notification.STATUS;
	REQUESTED = "REQUESTED";
	constructor(props){
		super(props);
		this.state = {
			requestStatus : this.props.notification.STATUS
		}
	}

	acceptClicked = () =>{
		console.log('acceptClicked');

		fetch('http://localhost:5000/respondToRequest', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				notificationid: this.props.notification.TRANSACTIONID,
				responseStatus: this.ACCEPTED
			})
		})
		.then(res=>res.json())
		.then(data=>{
			if(data.status === 'UPDATED'){
				console.log(`Request Accepted`);
				this.RESPONSE = 'Accepted';
				this.setState((prev)=>({requestStatus: this.RESPONDED}));
			}
			else{
				this.RESPONSE = 'Error';
			}
		})
		
	}
	rejectClicked = ()=>{
		console.log('rejectClicked');
		fetch('http://localhost:5000/respondToRequest', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				notificationid: this.props.notification.TRANSACTIONID,
				responseStatus: this.REJECTED
			})
		})
		.then(res=>res.json())
		.then(data=>{
			if(data.status === 'UPDATED'){
				this.RESPONSE = 'Rejected';
				this.setState((prev)=>({requestStatus: this.RESPONDED}));
			}
			else{
				this.RESPONSE = 'Error';
			}
		})
	}
	render(){
		let acceptButton = null;
		let rejectButton = null;
		let response = this.RESPONSE;
		if(response === this.REQUESTED){
			response = null;
		}
		if(this.state.requestStatus === this.REQUESTED){
			acceptButton = <Button 
								buttonClicked={this.acceptClicked}
								buttonLabel = {'Accept'}
								selected = {false}
							/>;
						
			rejectButton = <Button 
								buttonClicked={this.rejectClicked}
								buttonLabel = {'Reject'}
								selected = {false}
							/>;
		}
		
		const list = this.props.notification;
		
			switch(this.props.notificationType){
				case "WE_REQUESTED":
				return(
						<div className='notification-slot'>
							<div className='grid-item2'>
								You  requested {list.RESPONDER} {list.SEAT_COUNT} seat(s) from {list.TRAVEL_SOURCE} to {list.TRAVEL_DESTINATION}. (Quote: ${list.QUOTE})
							</div>
							<div className='auto-to-right grid-item2'>
								Status:
							</div>
							<div className='grid-item2 space-between'>
								{list.STATUS}
							</div>
						</div>
					);
				break;

				case "WE_RESPOND":
				return(
						<div className='notification-slot'>
							<div className='grid-item2'>
								{list.REQUESTER}  requested you {list.SEAT_COUNT} seat(s) from {list.TRAVEL_SOURCE} to {list.TRAVEL_DESTINATION}. (Quote: ${list.QUOTE})
							</div>
							<div className='auto-to-right grid-item2'>
								
								{acceptButton}
							</div>
							<div className='grid-item2 space-between'>
								{response}
								{rejectButton}	
							</div>
						</div>
					);
				break;
				default:
					return(
							<div>
								Default switch case executed! notificationType should be either WE_REQUESTED or WE_RESPONDED
							</div>

						);
				break;
			}
				
		}
}

export default NotificationSlot;