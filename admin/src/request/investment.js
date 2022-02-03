const axios = require("axios")
const config = require("config")

const exportReport = async (report) => {
  try {
    const resonse = await axios.get(`${config.investmentsServiceUrl}/investments/export`, {...report})
    return resonse.data
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {exportReport}
