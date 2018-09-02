import mongoose, { Schema } from 'mongoose'

const trackerSchema = new Schema({
  symbol: { type: String, required: true, unique: true },
  priceChange: { type: String },
  priceChangePercent: { type: String },
  weightedAvgPrice: { type: String },
  prevClosePrice: { type: String },
  lastPrice: { type: String },
  lastQty: { type: String },
  bidPrice: { type: String },
  askPrice: { type: String },
  highPrice: { type: String },
  lowPrice: { type: String },
  quoteVolume: { type: String },
  openTime: { type: Number },
  closeTime: { type: Number },
  firstId: { type: Number },
  lastId: { type: Number },
  count: { type: Number },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

trackerSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      priceChange: this.priceChange,
      priceChangePercent: this.priceChangePercent,
      weightedAvgPrice: this.weightedAvgPrice,
      prevClosePrice: this.prevClosePrice,
      lastPrice: this.lastPrice,
      quoteVolume: this.quoteVolume,
      openTime: this.openTime,
      closeTime: this.closeTime,
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
