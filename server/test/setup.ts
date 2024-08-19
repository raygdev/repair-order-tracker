import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../initApp'

declare global {
    var signin: () => Promise<string[] | undefined>
}

global.signin = async () => {
    const email = 'test@test.com'
    const password = 'password'

    const response = await request(app)
      .post('/api/login/')
      .send({
        email,
        password
      })
      .expect(200)

    const token = response.body.token

    return token
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'abcde'

    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {})
})

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections()

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    if(mongo) {
        await mongo.stop()
    }

    await mongoose.connection.close()
})