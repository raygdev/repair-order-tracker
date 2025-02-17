import mongoose from 'mongoose'

export interface PartsDocument extends mongoose.Document {
    price: number,
    name: string,
    jobId: mongoose.Types.ObjectId
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
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

const Part = mongoose.model<PartsDocument>('parts', PartsSchema, 'parts')

export { Part }