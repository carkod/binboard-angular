import mongoose, { Schema } from 'mongoose'

const allOrdersSchema = new Schema({
  symbol: {
    type: String
  },
  orderId: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  limit: {
    type: String
  },
  recvWindow: {
    type: String
  },
  timestamp: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

allOrdersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      orderId: this.orderId,
      startTime: this.startTime,
      endTime: this.endTime,
      limit: this.limit,
      recvWindow: this.recvWindow,
      timestamp: this.timestamp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('AllOrders', allOrdersSchema)

export const schema = model.schema
export default model
