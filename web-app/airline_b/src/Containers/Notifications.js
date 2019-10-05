import React, { Component } from 'react';
import NotificationSlot from './NotificationSlot.js';
class Notifications extends Component{
	
	AIRLINE = "Kingfisher Airlines";
	NOTIFICATION_FOUND = 'NOTIFICATION_FOUND';
	NO_NOTIFICATION_FOUND = 'NO_NOTIFICATION_FOUND';
	DATABASE_ERROR = 'DATABASE_ERROR';
	MESSAGE = null;
	constructor(props){
		super(props);
	}

	
	render(){
		
			const status = this.props.notificationContent.status;
			const notificationList = this.props.notificationContent.notificationList;
			console.log(`status: ${status}`);
			switch(status){
				case this.NOTIFICATION_FOUND:
				return(
					<div>
						{
							notificationList.map(notification =>{
								 let NOTIFICATION_TYPE = null;
								 //Assumed that requester can never be responder
								if(notification.REQUESTER === this.AIRLINE){
									NOTIFICATION_TYPE = "WE_REQUESTED";
									console.log(NOTIFICATION_TYPE); 
								}
								else{
									NOTIFICATION_TYPE = "WE_RESPOND";
								}
								return(
										<NotificationSlot notification={notification} notificationType={NOTIFICATION_TYPE}/>
								);						
							})
						}
					</div>
					);
				break;
				case this.NO_NOTIFICATION_FOUND:
					return(
					<div>
						No Notifications Found!
					</div>
					);
				break;
				case this.DATABASE_ERROR:
					return(
					<div>
						Database error occured!
					</div>
					);
				break;
				default:
					return(
					<div>
						An unknown error occured! This is because notificationContent.status is not either of 3 swicth cases.
					</div>
					);
				break;
			}
			
			
	}

}
export default Notifications;