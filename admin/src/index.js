const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const helmet = require("helmet")
const {generateCsv} = require("./utils")

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

app.get("/report", (req, res) => {
  request.get({url: `${config.investmentsServiceUrl}/investments`, json: true}, async (err, r, investments) => {
    if (err) {
      console.error(err)
    } else {
      // Generate csv text report
      const report = await generateCsv(investments)
      // This export admin generated report to investment service
      request.post({url: `${config.investmentsServiceUrl}/investments/export`, json: true, body: {report}}, function(error, response, body) {
        if (error) {
          console.log(error)
        } else {
          console.log(body)
        }
      })
      res.send({report})
    }
  })
})

module.exports = app
