import mongoose, { Schema } from 'mongoose'

const ticker24Schema = new Schema({
  symbol: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ticker24Schema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      symbol: this.symbol,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ticker24', ticker24Schema)

export const schema = model.schema
export default model
