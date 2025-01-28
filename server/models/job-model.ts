import mongoose from "mongoose";

enum Status {
    approved = 'approved',
    declined = 'declined',
    pending = 'pending'
}

interface Parts {
    price: number,
    name: string
}

interface JobDocument extends mongoose.Document {
    labor: number,
    status: Status,
    userId: string,
    repairId: string,
    parts?: Parts[]
}

const JobSchema = new mongoose.Schema({
    labor: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(Status),
      default: 'pending'
    },
    userId: {
      type: String,
      required: true
    },
    repairId: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true},
    timestamps: true
})

JobSchema.virtual( 'parts', {
    ref: 'parts',
    localField: '_id',
    foreignField: 'jobId'
})

const Job = mongoose.model<JobDocument>('jobs', JobSchema, 'jobs')