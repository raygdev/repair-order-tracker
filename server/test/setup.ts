import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../initApp'
import { User } from '../models/user-model'

declare global {
    var signin: () => Promise<string>
    var createUser: () => Promise<{firstName: string, lastName: string, email: string, password: string, id: string}>
}

global.createUser = async () => {
    const user = {
      firstName: "Test",
      lastName: "Test",
      email: "test@test.com",
      password: "password",
    };
  
    const newUser = new User(user);
    await newUser.save();
    return newUser;
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
    const collections = await mongoose.connection.db?.collections()
    if(collections) {
      for(let collection of collections) {
          await collection.deleteMany({})
      }
    }
})

afterAll(async () => {
    if(mongo) {
        await mongo.stop()
    }

    await mongoose.connection.close()
})