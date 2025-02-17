import express from 'express'
import { updatePartsRouter } from './update'
import { deletePartsRouter } from './delete'
import { createPartsRouter } from './new'

const router = express.Router()

router.use(updatePartsRouter)
router.use(deletePartsRouter)
router.use(createPartsRouter)

export { router as partsRoutes }