import request from 'supertest';
import { app } from '../app';
import createConnection from './../database';

describe("Users", () => {
    beforeAll(async () => {
        
    });
    request(app).post("/users")
        .send({
            name: "João Mangueira3",
            email: "joao3@joao.com"
        })
})

