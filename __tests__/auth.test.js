const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

let server;
const testMongoUri = "mongodb://localhost:27017/taskManagementTest";

beforeAll(async () => {
    server = app.listen(5001); // Use a different port for testing
    await mongoose.connect(testMongoUri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close();
});

beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({});
});

describe("Auth API", () => {
    it("should register a new user", async () => {
        const email = `test${Date.now()}@example.com`;
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: email,
                password: "password"
            });

        if (res.statusCode !== 201) {
            console.error("Registration failed with status code:", res.statusCode, "and body:", res.body);
        }

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("userId");
    });

    it("should login the user", async () => {
        const email = `test${Date.now()}@example.com`;

        const registerRes = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: email,
                password: "password"
            });

        if (registerRes.statusCode !== 201) {
            console.error("Registration before login failed with status code:", registerRes.statusCode, "and body:", registerRes.body);
        }

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: email,
                password: "password"
            });

        if (res.statusCode !== 200) {
            console.error("Login failed with status code:", res.statusCode, "and body:", res.body);
        }

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });
});
