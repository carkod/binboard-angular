import mongoose, { Schema } from 'mongoose'

const allOrdersSchema = new Schema({
  symbol: {
    type: String
  },
  orderId: { type: String },
  clientOrderId: { type: String },
  price: { type: String },
  origQty: { type: String },
  executedQty: { type: String },
  cummulativeQuoteQty: { type: String },
  status: { type: String },
  timeInForce: { type: String },
  side: { type: String },
  stopPrice: { type: String },
  icebergQty: { type: String },
  time: { type: Number },
  updateTime: { type: Number },
  isWorking: { type: Boolean}
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
      clientOrderId: this.clientOrderId,
      price: this.price,
      origQty: this.origQty,
      executedQty: this.executedQty,
      status: this.status,
      timeInForce: this.timeInForce,
      side: this.side,
      stopPrice: this.stopPrice,
      icebergQty: this.icebergQty,
      time: this.time,
      updateTime: this.updateTime,
      isWorking: this.isWorking,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('orders', allOrdersSchema)

export const schema = model.schema
export default model
