import mongoose, { Schema } from 'mongoose'

const settingsSchema = new Schema({
    symbol: { type: String },
    type: { type: String },
    recvWindow: { type: Number },
    bidAskLimit: { type: Number },
    baseCoin: { type: String },
    recvWindow: { type: Number },
    decimalPoints: { type: Number },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

settingsSchema.methods = {
  view (full) {
    const view = {
        id: this._id,
        type: this.type,
        symbol: this.symbol,
        recvWindow: this.recvWindow,
        bidAskLimit: this.bidAskLimit,
        baseCoin: this.baseCoin,
        decimalPoints: this.decimalPoints
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Settings', settingsSchema)

export const schema = model.schema
export default model
