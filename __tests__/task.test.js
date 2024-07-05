const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../index");

let server;
let token;
let taskId;
const testMongoUri = "mongodb://localhost:27017/taskManagementTest";

beforeAll(async () => {
    server = app.listen(5002);  // Use a different port for testing
    await mongoose.connect(testMongoUri);

    // Create a test user and get a token
    const user = await request(app)
        .post("/api/auth/register")
        .send({
            username: "testuser",
            email: "test@example.com",
            password: "password"
        });
        
    const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password"
    });
    
    token = res.body.token;
    
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close();
});

describe("Task API", () => {
    it("should create a new task", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test Task",
                description: "This is a test task",
                dueDate: new Date(),
                priority: "Low"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toBe("Test Task");
        taskId = res.body._id;
    });

    it("should get all tasks", async () => {
        const res = await request(app)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get a task by ID", async () => {
        const res = await request(app)
            .get(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe("Test Task");
    });

    it("should update a task", async () => {
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "Updated Test Task" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe("Updated Test Task");
    });

    it("should delete a task", async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });
});