require('app-module-path').addPath(__dirname)

const moment = require('moment')
const { init: authInit } = require('humandb-auth-api-connector')

const { postMessage } = require('lib/discussion')
const { generateReport } = require('lib/report')

const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.post('/generate-report', async (req, res, next) => {
  try {
    const report = await generateReport()

    await postMessage(`Available Data as of ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`, report)

    res.json({ status: 'ok' })
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => {
  console.log(`Data reporting container listening on port ${port}!`)

  await authInit(process.env.DATA_REPORTER_API_USER, process.env.DATA_REPORTER_API_PASSWORD)
})
