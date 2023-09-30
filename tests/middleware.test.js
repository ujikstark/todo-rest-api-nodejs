const request = require('supertest');
const app = require('../index');

const bcrypt = require('bcrypt');
const saltRounds = 10; 

// Import Todo and User model for seeding data
const Todo = require('../models/todo');
const User = require('../models/user');

const username = "test";
const password = "test";

beforeAll(async () => {
    
    await Todo.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({name: 'Test User', username: username, password: hashedPassword });
    
});


describe('GET /api/todos', () => {
    it('should return 401 if no authorization is added', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Authorization header missing');
    });

    it('should return 401 if authorization type is not Bearer', async () => {
        const response = await request(app).get('/api/todos').set('Authorization', 'X-API-KEY jwt_token');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid token format. you must use Bearer Authorization');
    });

    it('should return 401 if JWT Token is invalid', async () => {
        const response = await request(app).get('/api/todos').set('Authorization', 'Bearer jwt_token');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid JWT Token');
    });
    
    it('should return 401 if JWT Token has expired', async () => {
        const response = await request(app).get('/api/todos').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE3YTQ4ODViYjU0NmQ3NTJjMDJjNjMiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTYwNDgyNjQsImV4cCI6MTY5NjA1MTg2NH0.TC1oyqt_ZAynLnzG-sbYBRlOaqCXDkiLrYxrIoLTFfc');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'JWT Token has expired');
    });

    it('should get a list of all todos', async () => {
        const loginResponse = await request(app).post('/login').send({username: username, password: password});
        const response = await request(app).get('/api/todos').set('Authorization', 'Bearer '+loginResponse.body.access_token);
        expect(response.status).toBe(404); // expect 404 because no todos created
    });
});