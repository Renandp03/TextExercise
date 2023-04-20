import app from "app"
import { any, array, string } from "joi"
import supertest from "supertest"

const server = supertest(app)

describe("test fruits routers", () => {

    it("return fruits when GET: /fruits", async () => {
        const result = await server.get("/fruits");

        expect(result.status).toBe(200)
        expect(result.body).toEqual(expect.any(Array))
    })

    it("return status 404 when some expecific fruit is not found.", async () => {
        const result = await server.get("/fruits/0");

        expect(result.status).toBe(404);
    })

    it("If create a new fruit is ok.", async () => {

        const fruitInput = {
            name:"banana",
            price: 10
        }

        const result = await server.post("/fruits").send(fruitInput);
        expect(result.status).toBe(201);
      
    })

    it("when expecific fruit exist", async () => {

        const fruitInput = {
            name:"banana",
            price: 10
        }

        await server.post("/fruits").send(fruitInput);
        const result = await server.get("fruits/630dcba0-5123-464d-8213-62c518924261");

        expect(result.status).toBe(200);
    })

})