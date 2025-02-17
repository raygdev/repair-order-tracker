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

export interface JobDocument extends mongoose.Document {
    description: string
    labor: number,
    status: Status,
    userId: mongoose.Types.ObjectId,
    repairId: mongoose.Types.ObjectId,
    parts?: Parts[]
}

const JobSchema = new mongoose.Schema({
    labor: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(Status),
      default: 'pending'
    },
    description: {
        type: String,
        required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    repairId: {
        type: mongoose.Types.ObjectId,
        ref: "RepairOrders",
        required: true,
        index: true
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

export { Job }
