const superagent = require('superagent')
const { URLSearchParams } = require('url')

const { getAccessToken } = require('humandb-auth-api-connector')

const postMessage = async (title, raw) => {
  const chatBody = new URLSearchParams({ title, raw })

  //POST against the Discourse API to post the message
  const { body: json } = await superagent
    .post(`http://hdb-dash-auth:3001/auth/discussion/post/message`)
    .set({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`
    })
    .send(chatBody)
  
  console.log(chatBody, json)

  return { chatBody, json }
}

module.exports = {
  postMessage
}
