
const request = require("supertest");
const app = require("../app");

describe("Products API", () => {

    test("GET /api/products should return all products", async () => {

        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(0);

    });


test("POST /api/products should reject an empty dress name", async () => {

    const response = await request(app)
        .post("/api/products")
        .send({
            name: "",
            price: 999
        });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe("Dress name is required");

});


test("POST /api/products should reject a negative price", async () => {

    const response = await request(app)
        .post("/api/products")
        .send({
            name: "Blue Party Dress",
            price: -500
        });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe(
        "Please enter a valid price greater than zero"
    );

});



});

afterAll(async () => {
    const pool = require("../db");
    await pool.end();
});