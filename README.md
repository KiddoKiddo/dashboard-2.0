HOW TO RUN THE UI CODE
1. In folder dashboard-im, run":
		npm run start

HOW TO RUN THE SIMPLE WEBSERVICE

1. Make sure the connection to SMG Dev WiFi and run:
		npm run start-server

OR

1. Make sure the connection to SMG Dev WiFi
2. Run command one time: 
		export FLASK_APP=webservice.py
3. If auto reloading is required, run: 
		export FLASK_DEBUG=1
4. python -m flask run OR flask run