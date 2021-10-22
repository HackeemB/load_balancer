const body = require('body-parser');
const express = require('express');

const app1 = express();
const app2 = express();
const app3 = express();

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());
app3.use(body.json());

const handler = serverNum => (req, res) => {
    console.log(`server ${serverNum}`, req.method, req.url, req.body);
    if (serverNum == 1) {
	console.log("This is Server 1!");
	var i,x;
	for (i = 0; i < 25*200*1000*1000; i++){
            x = x + 1;
	}
	console.log("Server 1 is done!");
    }
    if (serverNum == 2) {
	console.log("This is server 2! ");
	var x = 10;
	var i;
	for (i = 1; i <= x; i++) {
	    if (i % 2 == 0) {
		console.log("i is an even number " + i);
	    }
	}
	
	console.log("Good news! Server 2 is done!");
    }
    if (serverNum == 3) {
	console.log("This is server 3! ");
	var randNum = Math.floor(Math.random() * 1000) + 100;
	var rem,temp = 0;
	var finalVal = 0;

	temp = randNum;
	while (temp > 0) {
	    rem = temp % 10;
	    temp = parseInt(temp/10);
	    finalVal = finalVal * 10 + rem;
	}
	if (randNum == finalVal) {
	    console.log("The random number is a palindrome! :)");
	    console.log("The original random number is: " + randNum);
	    console.log("The random number reversed is " + finalVal);
	}
	else {
	    console.log("The random number is not a palindrome! :(")
	    console.log("The original random number is: " + randNum);
            console.log("The random number reversed is " + finalVal);
	}
	console.log("Good news! Server 3 is done!");
    }
    
    res.send(`Hello from server ${serverNum}!`);
};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));
app3.get('*', handler(3)).post('*', handler(3));

app1.listen(3001);
app2.listen(3002);
app3.listen(3003);
