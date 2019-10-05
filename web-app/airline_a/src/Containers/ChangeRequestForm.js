import React, { Component } from 'react';
import Button from '../Components/button.js'
import web3 from '../web3';
import token from '../token';
import './change-request-form.css';

class ChangeRequestForm extends Component{
	
	REQUESTER = 'Delta Airlines';
	FRESH = 'FRESH';
	REQUESTED_SUBMITTED = 'REQUEST_SUBMITTED';
	ERROR = 'ERROR';
	
	MESSAGE = null;
	constructor(props){
		super(props);
		this.state = {
			display : this.FRESH
		}
	}

	submitRequestBC = async()=>{
		console.log("In submitRequestBC");
		const accounts = await web3.eth.getAccounts();
		const balance = await token.methods.viewBalance(accounts[0]).call();
		console.log(balance);
		console.log(accounts[0]);
		console.log(accounts[1]);
	}
	requestClicked = () =>{		

		const airlineFacility = this.refs.airlineFacility.value;
		const customerEmailid = this.refs.customerEmailid.value;
		const seatCount = this.refs.seatCount.value;
		const travelSource = this.refs.travelSource.value;
		const travelDestination = this.refs.travelDestination.value;
		const travelDate = this.refs.travelDate.value;
		const quote = this.refs.quote.value;
		console.log(`travelDate: ${travelDate}`);
		
		//this.submitRequestBC();
		fetch('http://localhost:5005/submitRequest', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body:JSON.stringify({
				requester : this.REQUESTER,
				responder : airlineFacility,
				customerEmailid: customerEmailid,
				seatCount : seatCount,
				travelSource: travelSource,
				travelDestination: travelDestination,
				travelDate : travelDate,
				quote : quote,
				requestStatus : 'REQUESTED'
			})
		})
		.then((res)=>res.json())
		.then(data=>{
			console.log(`data.status: ${data.status} \t${data.message}`);
			if(data.status === this.REQUEST_SUBMITTED){
				this.MESSAGE = data.message;
				this.setState((prev)=>({display: this.REQUEST_SUBMITTED}));
			}
			else{
				console.log(`data.status: ${data.status}`);
				this.MESSAGE = data.message;
				this.setState((prev)=>({display: this.ERROR}));
			}

		})
		
	}

	render(){
		const title = 'CHANGE REQUEST FORM';
		let message = this.MESSAGE;
		return(
				<div>
					<div className='center top-margin title'>
						{title}
					</div>
					
					<div className='request-form'>
						<div> </div>
						<div>
							<div>
								<b>Airline Facility: </b>
							</div>
							<div>
								<b>Customer emailid: </b>
							</div>
							<div>
								<b>Seat count: </b>
							</div>
							<div>
								<b>Start: </b>
							</div>
							<div>
								<b>Destination: </b>
							</div>
							<div>
								<b>Date: </b>
							</div>
							<div>
								<b>Quote (in USD): </b>
							</div>
						</div>

						<div>
							<div>
								<select ref='airlineFacility'>
								  <option value="NO_SELECTION">Select Airline Facility</option>
								  <option value="Kingfisher Airlines">Kingfisher Airlines</option>
								</select>
							</div>
							<div>
								<input ref="customerEmailid" type="text" placeholder="e.g. harry@buffalo.edu"/>
							</div>
							<div>
								<input ref="seatCount" type="text" placeholder="e.g. 2" />
							</div>
							<div>
								<input ref="travelSource" type="text" placeholder="e.g. Mumbai"/>
							</div>
							<div>
								<input ref="travelDestination" type="text" placeholder="e.g. New York"/>
							</div>
							<div>
								<input ref="travelDate" type="date"/>
							</div>
							<div>
								<input ref="quote" type="number" placeholder="e.g. $700"/>
							</div>
						</div>
						<div> </div>
					</div>

					<div className='center '>
								{<Button buttonLabel={'Submit Request'} buttonClicked={this.requestClicked}/>}         
					</div>

					<div className='ack-message center'>
						{message}
					</div>
				</div>
			);
		
	}
}
export default ChangeRequestForm;