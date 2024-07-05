const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

let server;
const testMongoUri = "mongodb://localhost:27017/taskManagementTest";
beforeAll(async () => {
    server = app.listen(5001);  // Use a different port for testing
    await mongoose.connect(testMongoUri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close();
});

describe("Auth API", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: "test@example.com",
                password: "password"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("userId");
    });

    it("should login the user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "password"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });
});
