const aa_port = 5005;
const DBIpAddress = 'localhost'
const compile = require('./compile.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');
const ObjectId = require('mongodb').ObjectID;
var Crypto = require('crypto-js')

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(cors());

oracledb.outFormat = oracledb.OBJECT;
const dbconfig = {user:'system', password: 'password-1', connectString: DBIpAddress}

const MongoClient = require('mongodb').MongoClient



loginFun = async (emailid, password) =>{
	//const loginQuery = `SELECT * FROM aa_members WHERE emailid = '${emailid}' AND password='${password}'`;
		var query = { emailid: `${emailid}`, password:`${password}`};
		//console.log(query);
		AirlineDb.collection("aa_members").find(query).toArray(function(err, result) {
		    if (err) throw err;
		    console.log(result);

				const authString = {
							status : 'INVALID_USER',
							memberid: "",
							firstname: "",
							lastname: ""
				}
				try{
					//Only one record should be available for a given username/emailid
					if(result.length === 1){
						user = result[0];
						authString.status       = "VALID_USER";
						authString.memberid     = 1000;
						authString.firstname    = user.firstname;
						authString.lastname     = user.lastname
					}
					console.log(authString);
					return(authString);
					db.close();
			  }catch(exception){
					console.log(`/loginFun/exception - \n${exception}`);
					authString.status = 'DATABASE_ERROR';
					return(authString);
				}
			});
}

server.post('/login', (req, res)=>{
	const emailid = req.body.emailid;
	const password = req.body.password;

	loginFun(emailid, password)
	.then((packet)=>{
		res.send(packet);
	})
})

submitRequestFun = async(requester, responder, customerEmailid, seatCount, travelSource,
			travelDestination, travelDate, quote, requestStatus) =>{

	const submitRequestQuery = `INSERT INTO airline_common_transactions (transactionid, requester,
		responder, customer_emailid, seat_count, travel_source, travel_destination, travel_date,
		quote, request_date, status) VALUES
		(ab_common_transactionid.NEXTVAL, '${requester}', '${responder}', '${customerEmailid}', ${seatCount},
		'${travelSource}', '${travelDestination}', TO_DATE('${travelDate}', 'YYYY-MM-DD'), ${quote}, SYSDATE, '${requestStatus}')`;

	console.log(`submitRequestQuery: ${submitRequestQuery}`);
	let packet = {
		status : 'DATABASE_ERROR',
		message: 'INITIAL_MESSAGE'
	}
	const COMMIT = 'COMMIT';
	try{
		conn = await oracledb.getConnection(dbconfig);
		const records = await conn.execute(submitRequestQuery);
		await conn.execute(COMMIT);
		const message   = await records.rows;
		await conn.close();
		console.log(records);
		packet.status = `REQUEST_SUBMITTED`;
		packet.message = `Request submitted successfully!`;
		return(packet)
	}
	catch(exception){
		console.log(`submitRequestFun exception: ${exception}`);
		packet.message = "Database error occured";
		console.log(`packet: ${packet.status} \t ${packet.message}`)
		return(packet);
	}
}

server.post('/submitRequest',(req, res)=>{

		const requester = req.body.requester;
		const responder = req.body.responder;
		const customerEmailid = req.body.customerEmailid;
		const seatCount = req.body.seatCount;
		const travelSource = req.body.travelSource;
		const travelDestination = req.body.travelDestination;
		const travelDate = req.body.travelDate;
		const quote = req.body.quote;
		const requestStatus = req.body.requestStatus;
		// SC Logic Starts here
		const hash = '0x' + Crypto.SHA224(customerEmailid+travelSource+travelDestination).toString();
		console.log(hash);
		compile.compileAndConnect()
		.then(cont=>{
			contract = cont;
		})

		.then(()=>{
		contract.request(web3.eth.accounts[2], hash, {from:web3.eth.accounts[1]})
		})

		submitRequestFun(requester, responder, customerEmailid, seatCount, travelSource,
			travelDestination, travelDate, quote, requestStatus)
		.then(packet=>{
			res.send(packet);
		});
})

getNotificationFun = async (airline) => {
	const getRequestQuery = `SELECT * FROM airline_common_transactions WHERE responder = '${airline}'`; //accept or reject button
	const getRespondedQuery = `SELECT * FROM airline_common_transactions WHERE requester = '${airline}'`; // AND status != 'REQUESTED'`; //get to know if request has been responded

	console.log(`getRequestQuery: ${getRequestQuery}`);
	console.log(`getRespondedQuery: ${getRespondedQuery}`);
	let packet = {
		status: 'INITIAL_STATUS',
		notificationList: null,
	}
	try{
		conn = await oracledb.getConnection(dbconfig);
		const requestRecords = await conn.execute(getRequestQuery);
		const respondedRecords = await conn.execute(getRespondedQuery);

		const requestList = requestRecords.rows;
		const respondedList = respondedRecords.rows;

		const notificationList = requestList.concat(respondedList);

		if(notificationList.length === 0){
			packet.status = `NO_NOTIFICATION_FOUND`;
		}
		else{
			packet.status = `NOTIFICATION_FOUND`;
			packet.notificationList = notificationList;
		}
		return(packet);
	}
	catch(exception){
		console.log(`getNotificationFun exception: ${exception}`)
		packet.status = `DATABASE_ERROR`;
		return(packet);
	}

}

server.post('/getNotifications', (req, res)=>{
	const airline = req.body.airline;
	console.log(`getNotifications: ${airline}`);
	getNotificationFun(airline)
	.then(packet =>{
		res.send(packet)
	})
})

respondToRequest = async (transactionid, response) =>{

	const respondToRequestQuery = `UPDATE airline_common_transactions SET status='${response}' WHERE transactionid=${transactionid}`;
	const COMMIT =`COMMIT`;
	const packet = {
		status: "",
		message: ""
	}
	try{
		conn = await oracledb.getConnection(dbconfig);
		const records = await conn.execute(respondToRequestQuery);
		await conn.execute(COMMIT);
		await conn.close();

		if(records.rowsAffected === 1){
			packet.status = 'UPDATED';
		}
		else{
			packet.status = 'NOT_UPDATED',
			packet.message = `Should have updated exactly one record but updated ${records.rowsAffected} record(s)`;
		}

		return(packet);
	}
	catch(exception){
		console.log('respondToRequest exception '+exception);
		packet.status = 'DATABASE_ERROR',
		packet.message = `A database error has occured in respondToRequest`;
		return(packet);
	}
}

server.post('/respondToRequest', (req, res)=>{
	const transactionid = req.body.notificationid;
	const response = req.body.responseStatus;
	console.log(`respondToRequest ${response}`);
	const hash = '0x' + Crypto.SHA224(transactionid).toString();
	console.log(hash);
	compile.compileAndConnect()
	.then(cont=>{
		contract = cont;
	})

	.then(()=>{
	const oneEther = 1000000000000000000; //18 zeros

	contract.response(web3.eth.accounts[2], hash, oneEther, {from:web3.eth.accounts[1]})
	var escrew = contract.getAirlineEscrew(web3.eth.accounts[2]);
	console.log(escrew);
	contract.settlePayment(web3.eth.accounts[1], {from:web3.eth.accounts[2], value:escrew});
	})

	respondToRequest(transactionid, response)
	.then(packet=>{
		res.send(packet);
	})
})

MongoClient.connect('mongodb+srv://abhav:npm123@bl-qztin.mongodb.net/test?retryWrites=true',(err, database) =>{
    if (err) return console.log(err)
    AirlineDb = database.db('Airline')
    AirlineDb.collection('aa_members')
    AirlineDb.collection('airline_common_transactions')
		server.listen(aa_port, () => {
			console.log(`Airline A server is active on port no.: ${aa_port}`);
		})
})
