# openfy demo app

This is and example demo app for **openfy** using `node.js`. If you haven't installed please [install it first](https://nodejs.org/en/download/package-manager/). It's also needed to [install ngrok](https://ngrok.com/download) to proxy localhost for webhooks. Webhooks will be used to receive meeting events, in particular we are interested in the `recordingConverted` event.

1. Let's start with getting ngrok up an running:
```shell
ngrok http 8000
```

It will output something like this:
```
Session Status                online
Session Expires               1 hour, 59 minutes
Update                        update available (version 3.0.4, Ctrl-U to update)
Terms of Service              https://ngrok.com/tos
Version                       3.0.3
Region                        Europe (eu)
Latency                       37.451218ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://b760-85-238-96-166.eu.ngrok.io -> http://localhost:8000
```

2. After that, please open a `.env` file and change the value of the  `NGROK_URL_HERE` variable to the url listed above (e.g. `https://b760-85-238-96-166.eu.ngrok.io`). Then please change and change the `YOUR_API_KEY_HERE` string with an actual Api Key.
Here you can find information on how to get the API key: [Creating an API Key](https://proficonf.dev/docs/creating-meetings-programmatically#creating-an-api-key)

3. Next let's install necessary npm packages:

```shell
npm install
```

4. And finally, run the application:

```shell
node app.js
```

Open `http://losalhost:8000` in your browser to check it out!
