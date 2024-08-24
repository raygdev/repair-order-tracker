import request from 'supertest'
import { app } from '../../../initApp'
import { RepairOrders } from '../../../models/repair-order-model'

describe('POST /repairorder', () => {
    it('fails to create repair if not authenticated', async () => {
        const vin = '12345678912345678'
        const notes = ''
        const ro_number = '123545'
        await request(app)
          .post('/repairorder')
          .send({
            vin,
            notes,
            ro_number
          })
          .expect(401)
    })
})