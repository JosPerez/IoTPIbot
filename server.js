'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const bot = require('./bot.js');

const facebookConfig = {
	pageAccessToken: 'EAALEhvAPIdoBAEXrvwJUuXsyxCIZChqsDrWSlk38Cda7JFSPsfmyD7MAFjNa5OMqxkoTn0qdjsnL3MjZApyDIPZAgz5H8VLXcsjZCeJOitajrYKFZBTztWsPFVa8tSkeOS5YEzroiseNvYOvGTkCMAlC2ESBiOBWWZCuJRV4ZBYZCQZDZD',
	validationToken: 'jose',
}

const app = express()

app.set('port',process.env.PORT || 8080)
app.use(bodyParser.json())

app.get('/webhook', (req,res) => {
	if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === facebookConfig.validationToken) {
		console.log('validating webhook')
		res.status(200).send(req.query['hub.challenge'])
	}else{
		console.error('Failed validation')
		res.sendStatus(403)
	}
})
app.post('/webhook', (req,res) =>{
	const data = req.body
	if(data.object === 'page'){
		data.entry.forEach(pageEntry => {
			pageEntry.messaging.forEach(messagingEvent =>{
				if(messagingEvent.message) {
					if(!messagingEvent.message.is_echo){
						bot.handleMessage(messagingEvent)
					}
				}else if (messagingEvent.postback && messagingEvent.postback.payload){
					console.log("postback")
				}
			})
		})
		res.sendStatus(200)
	}
})
app.listen(app.get('port'), () =>{
	console.log('bot running on',app.get('port'))
})
module.exports = {
	facebookConfig,
}