import mongoose from 'mongoose'

export interface PartsDocument extends mongoose.Document {
    price: number,
    name: string,
    jobId: mongoose.Types.ObjectId
    quantity: number
}

const PartsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0.00
    },
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: 'jobs',
        required: true,
        index: true
    },
    quantity: {
        type: Number,
        default: 1,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

const Part = mongoose.model<PartsDocument>('parts', PartsSchema, 'parts')

export { Part }