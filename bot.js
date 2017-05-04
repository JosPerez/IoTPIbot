const send = require('./facebook.js')
const vision = require('node-cloud-vision-api');
const conversationApi = require('watson-developer-cloud/conversation/v1');
const translate = require('@google-cloud/translate')({
	projectId:'iotpibot',
	key: 'AIzaSyC3cVASpk4weIz7KBo-fXqJmNKs6v0FSBA'
});
const speech = require('@google-cloud/speech')({
	projectId:'iotpibot',
	credentials: require('./IoTPIbot-2a058d39a785.json')
})

//image view
vision.init({auth: 'AIzaSyC3cVASpk4weIz7KBo-fXqJmNKs6v0FSBA'})
//conversation watson
var conversation = new conversationApi({
	username:'506418cf-74ed-490f-b1c2-a532da54b1f1',
	password:'fKqDzwTdys6t',
	version_date: conversationApi.VERSION_DATE_2017_04_21
});
//translate google 

function handleMessage(event){
	const senderID = event.sender.id
	const messageText = event.message.text
	const messageAttachment = event.message.attachments
	if(messageText){
		conversation.message({
			input: {text: messageText},
			workspace_id: 'aa15897f-44ba-4a12-b34a-c8bbce252854'
		},function(err,response) {
			if(err){
				console.log(err);
			}else {

				if(response.intents[0].intent === 'traduccion'){
					send.replyMessage(senderID,response.output.text[0]);
					var text = messageText.substring(9);
					var target = text.substring(0,2);
					text = text.substring(2);
					translate.translate(text,target).then((result) => {
						console.log(result);
						send.replyMessage(senderID,result[0]);
					}).catch((e)=> {
						console.log(e);
					})
				}else {
					send.replyMessage(senderID,response.output.text[0]);
				}
			}
		})
	}else if (messageAttachment){
		if(messageAttachment[0].type === 'image'){
			detectText(messageAttachment[0].payload.url,senderID);
		}else if(messageAttachment[0].type === 'audio'){
			const options = {
				encoding:'LINEAR16',
				sampleRateHertz:16000,
				languageCode:'es-MX',
			}
			var url = messageAttachment[0].payload.url
			speech.recognize(url,options).then((result) => {
				console.log(url);
			}).catch((e)=>{
				console.log(e);
			})
		}
	}
}

function detectText(urlImage,id) {
	const req = new vision.Request({
		image: new vision.Image({
			url: urlImage
		}),
		features: [new vision.Feature('LABEL_DETECTION',10)]
	})
	console.log("before")
	vision.annotate(req).then((res) => {
	  //console.log(res.responses[0])
	  res.responses[0].labelAnnotations.forEach(labels => {
	  	console.log(labels.description)
	  	send.replyMessage(id,labels.description)
	  })
	}, (e) => {
 	 console.log('Error: ', e)
	}).catch((err) => {
		console.log(err)
	})
}



module.exports = {
	handleMessage,
}