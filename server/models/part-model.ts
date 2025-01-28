import mongoose from 'mongoose'

interface PartsDocument extends mongoose.Document {
    price: number,
    name: string,
    jobId: string
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
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

const Part = mongoose.model<PartsDocument>('parts', PartsSchema, 'parts')

