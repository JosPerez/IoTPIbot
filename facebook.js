var request = require('request');

function sendMessage(messageData) {
	return new Promise((resolve, reject) => {
		request({
			uri:'https://graph.facebook.com/v2.9/me/messages',
			qs: {access_token: 'EAALEhvAPIdoBAEXrvwJUuXsyxCIZChqsDrWSlk38Cda7JFSPsfmyD7MAFjNa5OMqxkoTn0qdjsnL3MjZApyDIPZAgz5H8VLXcsjZCeJOitajrYKFZBTztWsPFVa8tSkeOS5YEzroiseNvYOvGTkCMAlC2ESBiOBWWZCuJRV4ZBYZCQZDZD'},
			method: 'POST',
			json:messageData,
		}, (error,response) => {
			if (!error && response.stateCode === 200) {
				console.log('All good job is done')
				resolve()
			}else {
				reject(error)
			}
		})
	}).catch(err => {
		console.log(err)
	})
}

function replyMessage(recipientId, messageText) {
	return new Promise((resolve, reject) => {

		const messageData = {
			recipient : {
				id: recipientId,
			},
			message: {
				text: messageText
			},
		}
		sendMessage(messageData).then(() => {
			resolve()
		}).catch((err) => {
			reject(err)
		})
	})
}
module.exports = {
	replyMessage,
}