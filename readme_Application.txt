Name: Piyush Wani (pwani	- 50288616)
Team member: Abhav Luthra (abhavlut - 50288904)

Starting the Database:
	1.	This application uses Oracle 11g Express Edition as its database. 
	2.	Visit the following link to download the software for your respective system:	https://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html
	3.	Install from the setup file and follow the onscreen instructions. Set up the password as 'password'.
	4.	Start the Oracle Database 11G Express application. If you encounter an error saying "Windows cannot find 'http:/.127.0.0.1:%HTTPPORT%/apex/f?p=4950'...",
		then type the following directly in your browser address bar to access the database home page: "http:/.127.0.0.1:8080/apex/f?p=4950".
	5.	For a more permanent solution, open up the folder where your Oracle is stored and navigate to server folder( in my case C:\Oracle\oraclexe\app\oracle\product\11.2.0\server). In that folder right click the 'Get_Started file' and choose properties.
		There you can enter your http port which is usually 8080, so type in "http:/.127.0.0.1:8080/apex/f?p=4950".
	6.	Navigate to the 'Storage' tab. When prompted, enter the username as 'System' and enter the password as 'password'.
	7.	Create a new database user with required details and confirm password. Next, Login using these details to use the Oracle 11g database.

Required Installations:
	1.	Download node.js for your system.

Connecting nodeJS to Oracle:
	1.	Open the "Run SQL Command Line" window. Type in your respective details in the command: "connect username/password". There should be a confirmation saying "Connected".
	2.	Copy all the data from "DDL&DML.txt" in the Marketplace_Backend folder and paste it in the SQL CL and press enter. Type "commit;" and press enter.
	3.	Open a Command Prompt window.
	4.	In the terminal, change directory to the back-end/airline_a , back-end/airline_b, web-app/airline_a and web-app/airline_b to access the "package.json" file. Run the command "npm install" to install all dependencies.

Running the Application:
	Open terminal and change the directory .../back-end/airline_a and .../back-end/airline_b and run: 
	1. npm install
	2. npm start
	This will start the Node server

	Open ANOTHER terminal and change the directory .../web-app/airline_a and .../web-app/airline_b and run:
	1. npm install
	2. npm start
	This will start the React server and automatically pop a browser window/tab.

	You should now sell a login page ->
	AirlineA - DELTA
	username: pwani@buffalo.edu
	password: pass

	AirlineB - KINGFISHER
	username: aluthra@buffalo.edu
	password: pass


Using the Application:
1.	Explore the application interface and put up a request.
2.	You will get Notifications from other airline and youcan accept and reject it. Depending on that it will update ether in your account.