const {generateCsv} = require("../utils")

const dto = [{
  id: 1,
  userId: 1,
  firstName: "Billy",
  lastName: "Bob",
  investmentTotal: 1400,
  date: "2020-01-01",
  holdings: [{"id": "2", "investmentPercentage": 1}],
  value: 1200,
}]

describe("Generate Csv", function() {

  it("it should be defined.", async () => {
    // Test case to expect a defined value for generate function
    const res = await generateCsv(dto)
    expect(res).toBeDefined()
  })

  it("it should expect string as return", async () => {
    // This test case satisfy that generateCsv must return with string value
    const res = await generateCsv(dto)
    expect(res).toEqual(expect.any(String))
  })

  test("it must have a userId value.", () => {
    // Test mock has userId && firstName in object
    expect(dto).toEqual(expect.arrayContaining([
      expect.objectContaining({userId: 1}),
      expect.objectContaining({firstName: "Billy"}),
    ]))
  })

  test("it should have computed holding value property.", () => {
    // Tast mock object if holding computed value key exist
    expect(dto[0]).toHaveProperty("value")
  })
})
