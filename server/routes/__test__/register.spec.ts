import requst from 'supertest'
import express from 'express'
// @ts-ignore
import { initApp } from '../../initApp.js'
const app = express()
initApp(app, express)


describe('POST /api/register/user', () => {
    it('passes', () => {
        expect(true).toBe(true)
    })
})