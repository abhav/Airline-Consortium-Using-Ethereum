import React from 'react';
import './body.css';
import ChangeRequestForm from '../Containers/ChangeRequestForm.js';
import Notifications from '../Containers/Notifications.js';
const body = (props) =>{
	
	const REQUEST = "REQUEST";
	const NOTIFICATIONS = "NOTIFICATIONS";

	console.log("Display in body.js: ", props.display);
	
	switch(props.display){
		case REQUEST:
			return(
				<div className="grid-container">
					  <div></div> 				  
					  <div className="grid-item">
					  	<ChangeRequestForm />
					  </div>				  
					  <div></div>  
				</div>
			)
		break;
		
		case NOTIFICATIONS:
			return(
				<div className="grid-container">
					  <div></div> 				  
					  <div className="grid-item">
					  	<Notifications notificationContent={props.notificationContent}/>
					  </div>				  
					  <div></div>  
				</div>
			)
		break;
	}	
}
export default body;