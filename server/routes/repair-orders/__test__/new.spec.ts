import request from 'supertest'
import { app } from '../../../initApp'
import { RepairOrders } from '../../../models/repair-order-model'

describe('POST /repairorder', () => {
    it('fails to create repair if not authenticated', async () => {
        const vin = '12345678912345678'
        const notes = ''
        const ro_number = '123545'
        await request(app)
          .post('/api/repairorder')
          .send({
            vin,
            notes,
            ro_number
          })
          .expect(401)
    })

    it('fails with errors when body properties aren\'t present', async () => {
      await createUser()
      const token = await signin()

      const response = await request(app)
        .post('/api/repairorder')
        .auth(token, { type: 'bearer'})
        .send()
        .expect(400)

      expect(Array.isArray(response.body.errors)).toEqual(true)
      response.body.errors.forEach((error: any) => {
        expect(error).toHaveProperty('message')
        expect(error).toHaveProperty('field')
      })
    })
    it('it creates a new repair order with an invalid vin', async () => {
      const user = await createUser()
      const token = await signin()

      const response = await request(app)
        .post('/api/repairorder')
        .auth(token, { type: 'bearer' })
        .send({
          vin: '15677890KJkswRt9l',
          ro_number: 24,
          isWarranty: true,
        })
        .expect(200)

      expect(response.body.userId).toEqual(user.id)
    })
    it('', async () => {
      expect(true).toEqual(true)
    })
})