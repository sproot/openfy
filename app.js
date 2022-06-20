require('dotenv').config();

const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.static('.'));
app.use(express.json());

// We are using REST API and axios library to create a new meeting
// Get more information on this by following this link: ...
app.post('/create-meeting', async (_, res) => {
    try {
        const response = await axios.post('https://api.proficonf.com/v1/meetings', {
            name: 'My custom meeting name',
            setting: {
                // Set role for a self-joined participant as a viewer
                // The viewer cannot turn on the camera and microphone, can only watch and use chat
                defaultRole: 'viewer',
                autoRecording: true // start recording automatically
            },
            // Let's set webhookUrl so that we can receive 'recordingConverted' event & other events as well
            webhookUrl: `${process.env.NGROK_URL}/webhooks`

        }, { headers: { 'X-API-KEY': process.env.API_KEY } });

        res.json(response.data).status(response.status);
    } catch (error) {
        console.log('error', error);
        res.sendStatus(500);
    }
});

// In order to join a meeting as a host (owner) we need get an appropriate token and then use it in iframe.
// You can read more about participant-tokens here: ...
app.post('/get-token-for-host/:meetingId', async (req, res) => {
    try {
        const response = await axios.post('https://api.proficonf.com/v1/participant-tokens', {
            meetingId: req.params.meetingId,
            name: 'Jon Snow', // participant name
            locale: 'pt',
            // available roles are: owner, moderator, speaker, viewer
            // Please find more about the roles here:
            // https://help-en.proficonf.com/conference-room-functionality-for-the-host/types-of-roles-for-participants
            role: 'owner'
        }, { headers: { 'X-API-KEY': process.env.API_KEY } });

        res.json(response.data).status(response.status);
    } catch (error) {
        console.log('error', error);
        res.sendStatus(500);
    }
});

// In order to test webhooks locally it's recommended to use ngrok
// To install it, please follow this guide: https://ngrok.com/docs/getting-started
// Once installed, simply use 'ngrok http 8000' command
app.post('/webhooks', (req, res) => {
    const webhook = req.body;

    if (webhook.eventName === 'recordingConverted') {
        console.log('recordingConverted event received!', webhook);
    } else {
        console.log(`'${webhook.eventName}' event received.`);
    };

    res.sendStatus(200);
});


app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server is now listening on port ${process.env.HTTP_PORT}`);
});
