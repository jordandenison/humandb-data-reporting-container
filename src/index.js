require('app-module-path').addPath(__dirname)

const { init: authInit } = require('humandb-auth-api-connector')

const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.listen(port, async () => {
  console.log(`Data reporting container listening on port ${port}!`)

  await authInit(process.env.DATA_REPORTER_API_USER, process.env.DATA_REPORTER_API_PASSWORD)
})
