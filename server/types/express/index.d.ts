import { UserDoc } from '../../models/user-model'
import express from 'express'

declare global {
    namespace Express {
        export interface Request {
            user: UserDoc | undefined
        }
    }
}