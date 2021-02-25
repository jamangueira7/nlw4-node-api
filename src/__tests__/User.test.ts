import request from 'supertest';
import { app } from '../app';
import createConnection from './../database';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("should be able to create a new user", async () => {
        const response = await request(app).post("/users")
            .send({
                name: "João Mangueira4",
                email: "joao4@joao.com"
            });

        expect(response.status).toBe(201);
    });

    it("should be able to create a new user with exists email", async () => {
        const response = await request(app).post("/users")
            .send({
                name: "João Mangueira4",
                email: "joao4@joao.com"
            });

        expect(response.status).toBe(400);
    });

})

