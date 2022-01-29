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

app.get("/report", async (req, res) => {
  request.get(`${config.investmentsServiceUrl}/investments`, (err, r, investments) => {
    if (err) {
      console.error(err)
    } else {
      const report = generateCsv(investments)
      request.post({url: `${config.investmentsServiceUrl}/investments/export`, json: true, body: {report}}, function(error, response, body) {
        if (error) {
          console.log(error)
        } else {
          console.log(body)
        }
      })
      res.send("hello")
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
