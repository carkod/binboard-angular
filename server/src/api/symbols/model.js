import mongoose, { Schema } from 'mongoose'

const symbolsSchema = new Schema({
  symbol: {
    type: String
  },
  status: {
    type: String
  },
  baseAsset: {
    type: String
  },
  baseAssetPrecision: {
    type: String
  },
  quoteAsset: {
    type: String
  },
  quotePrecision: {
    type: String
  },
  orderTypes: {
    type: String
  },
  icebergAllowed: {
    type: String
  },
  filters: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

symbolsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      status: this.status,
      baseAsset: this.baseAsset,
      baseAssetPrecision: this.baseAssetPrecision,
      quoteAsset: this.quoteAsset,
      quotePrecision: this.quotePrecision,
      orderTypes: this.orderTypes,
      icebergAllowed: this.icebergAllowed,
      filters: this.filters,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Symbols', symbolsSchema)

export const schema = model.schema
export default model
