const axios = require("axios")
const config = require("config")

const getAccounts = async () => {
  try {
    const resonse = await axios.get(`${config.financialServiceUrl}/companies`)
    return resonse.data
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {getAccounts}
