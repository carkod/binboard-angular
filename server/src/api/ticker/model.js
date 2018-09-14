import mongoose, { Schema } from 'mongoose'

const tickerSchema = new Schema({
  symbol: {
    type: String
  },
  price: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tickerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ticker', tickerSchema)

export const schema = model.schema
export default model
