const R = require("ramda")
const {parse} = require("json2csv")

const fields = [
  {label: "User", value: "userId"},
  {label: "First Name", value: "firstName"},
  {label: "Last Name", value: "lastName"},
  {label: "Date", value: "date"},
  // {label: "Holding", value: ""},
  {label: "Value", value: "value"},
]

function generateCsv(req) {
  const obj = JSON.parse(req)
  const myData = obj.map((data) => {
    const {investmentTotal, holdings} = data
    const el = x => x.investmentPercentage
    const sumInvestmentPercentages = R.reduce(R.add, 0, R.map(el, holdings))
    const val = investmentTotal * sumInvestmentPercentages
    return R.assoc("value", val, data)
  })
  const csv = parse(myData, {fields})
  // console.log(csv)
  return csv
}

module.exports = {fields, generateCsv}
