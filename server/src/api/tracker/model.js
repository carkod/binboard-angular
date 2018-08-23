import mongoose, { Schema } from 'mongoose'

const trackerSchema = new Schema({
  symbol: {
    type: String
  },
  interval: {
    type: String
  },
  limit: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

trackerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      interval: this.interval,
      limit: this.limit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tracker', trackerSchema)

export const schema = model.schema
export default model
