import mongoose, { Schema } from 'mongoose'

const myTradesSchema = new Schema({
  symbol: { type: String },
  id: { type: Number },
  orderId: { type: Number },
  price: { type: String },
  qty: { type: String },
  commission: { type: String },
  commissionAsset: { type: String },
  time: { type: Number },
  isBuyer: { type: Boolean },
  isMaker: { type: Boolean },
  isBestMatch: { type: Boolean }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

myTradesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      id: this.id,
      orderId: this.orderId,
      price: this.price,
      qty: this.qty,
      commission: this.commission,
      commissionAsset: this.commissionAsset,
      time: this.time,
      isBuyer: this.isBuyer,
      isMaker: this.isMaker,
      isBestMatch: this.isBestMatch,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('mytrades', myTradesSchema)

export const schema = model.schema
export default model
