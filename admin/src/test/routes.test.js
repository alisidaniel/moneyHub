const request = require("supertest")
const app = require("../index")

describe("Admin API service routes test", () => {

  it("GET /investments/:id", async () => {
    // should respond with a 200 status code
    // should specify text/html in the content type header
    const res = await request(app).get(`/investments/${expect.any(Number)}`)
    expect(res.statusCode).toBe(200)
    expect(res.headers["content-type"]).toEqual(expect.stringContaining("text/html"))
  })

  it("GET /report", async () => {
    // should respond with a 200 status code
    // should match return obj
    // should specify json in the content type header
    const res = await request(app).get("/report")
    expect(res.body).toBeDefined()
    expect(res.body).toMatchObject({report: expect.any(String)})
    expect(res.statusCode).toBe(200)
    expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
  })
})
