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

describe('Login Route', () => {
    it('should return a JWT token on successful login', async () => {
        const response = await request(app)
        .post('/login')
        .send({ username: username, password: password }); // Provide valid login credentials

        expect(response.status).toBe(200); // Expect a successful response status code
        expect(response.body).toHaveProperty('access_token'); // Expect a token in the response body
    });

    it('should return 401 on invalid login credentials', async () => {
        const response = await request(app)
        .post('/login')
        .send({ username: 'invaliduser', password: 'invalidpassword' }); // Provide invalid login credentials

        expect(response.status).toBe(401); // Expect an unauthorized response status code
    });

    it('should return 401 on missing login credentials', async () => {
        const response = await request(app).post('/login'); // Send a request without credentials

        expect(response.status).toBe(401); // Expect an unauthorized response status code
    });
});