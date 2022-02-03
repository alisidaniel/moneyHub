const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const helmet = require("helmet")
const {generateCsv} = require("./utils")
const {exportReport} = require("./request")

const app = express()
app.use(helmet())
app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
})

app.get("/report", async (req, res) => {
  request.get({url: `${config.investmentsServiceUrl}/investments`, json: true}, async (err, r, investments) => {
    if (err) {
      console.error(err)
    } else {
      // Generate csv text report
      const report = await generateCsv(investments)
      // this line exports report to investment service
      await exportReport(report)
      res.send({report})
    }
  })
})

module.exports = app
