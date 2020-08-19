import request from 'supertest'
import app from '../config/app'

describe('Register Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/register')
            .send({
                name: 'Lucas',
                email: 'lucaswf659@gmail.com',
                password: '123',
                passwordConfirmation: '123'
            })
            .expect(200)
    })
})