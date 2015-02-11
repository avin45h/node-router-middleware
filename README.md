### VECTOROUTER

vectorouter, points URLs to desired callbacks, just like a good ol' vector
should

To execute the sample code

npm start

To test the sample code

npm install
npm test

* * *

Usage : 

1.  Require vectorouter

    var vectorouter = require('./vectorouter');

2.  Execute to get app instance

    var app = vectorouter();

3.  For Simple Middlewares

    app.use(callback)

4.  For Mounting Middleware to specific URL
    
    app.use(url,callback)

5.  For Plain routing
    
    app."httpVerb"(url,callback) , for eg. app.get('/',foo);
