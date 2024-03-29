const R = require("ramda")
const {fields} = require("../schema")
const {Parser} = require("json2csv")

const {getAccounts} = require("../request")

// filter function for accounts
const getAccount = (a, b) => R.find(R.propEq("id", a), b)

// this will return mulitple of investmentPercentage, investmentTotal
const calculaHoldingValue = (a, b) => R.multiply(a, b)

/*
Take three params (items, row, accounts)
this function returns computed holding value, name with object
*/
const getInvestment = (item, row, accounts) => {
  const {id, investmentPercentage} = item
  const {investmentTotal, userId, firstName, lastName, date} = row
  const {name} = getAccount(id, accounts)
  return {
    ...item,
    userId,
    firstName,
    lastName,
    date,
    holding: name,
    value: calculaHoldingValue(investmentPercentage, investmentTotal),
  }
}

// This function maps through each investment holding and returns all holding in an array
const getInvestmentHoldings =  (row, accounts) => R.map(item => getInvestment(item, row, accounts), row.holdings)

/*
  Function return csv text
*/
const generateCsv = async (row) => {
  const accounts = await getAccounts()
  const myObj = R.map(item => getInvestmentHoldings(item, accounts), row)
  const res = myObj.reduce((r, array) => [...r, ...array.map((value) => (value))], [])
  const json2csvParser = new Parser({fields})
  const csv = json2csvParser.parse(res)
  return csv
}

module.exports = {generateCsv}
