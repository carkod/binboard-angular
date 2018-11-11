import mongoose, { Schema } from 'mongoose'

const openOrdersSchema = new Schema({
  symbol: {
    type: String
  },
  orderId: {
    type: String
  },
  clientOrderId: {
    type: String
  },
  price: {
    type: String
  },
  origQty: {
    type: String
  },
  executedQty: {
    type: String
  },
  cummulativeQuoteQty: {
    type: String
  },
  status: {
    type: String
  },
  timeInForce: {
    type: String
  },
  type: {
    type: String
  },
  side: {
    type: String
  },
  stopPrice: {
    type: String
  },
  icebergQty: {
    type: String
  },
  time: {
    type: String
  },
  updateTime: {
    type: String
  },
  isWorking: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

openOrdersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      orderId: this.orderId,
      clientOrderId: this.clientOrderId,
      price: this.price,
      origQty: this.origQty,
      executedQty: this.executedQty,
      cummulativeQuoteQty: this.cummulativeQuoteQty,
      status: this.status,
      timeInForce: this.timeInForce,
      type: this.type,
      side: this.side,
      stopPrice: this.stopPrice,
      icebergQty: this.icebergQty,
      time: this.time,
      updateTime: this.updateTime,
      isWorking: this.isWorking,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('OpenOrders', openOrdersSchema)

export const schema = model.schema
export default model
