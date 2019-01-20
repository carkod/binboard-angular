import mongoose, { Schema } from 'mongoose'

const emailNotificationsSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  cc: { type: String },
  bcc: { type: String },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String },
  attachments: { type: Array },
  replyTo: {
    type: String
  },
  inReplyTo: {
    type: String
  },
  references: {
    type: String
  },
  attachDataUrls: {
    type: String
  },
  watchHtml: {
    type: String
  },
  icalEvent: {
    type: String
  },
  alternatives: {
    type: String
  },
  encoding: {
    type: String
  },
  raw: {
    type: String
  },
  textEncoding: {
    type: String
  },
  priority: {
    type: String
  },
  headers: {
    type: String
  },
  messageId: {
    type: String
  },
  list: {
    type: String
  },
  disableFileAccess: {
    type: String
  },
  disableUrlAccess: {
    type: String
  }
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

emailNotificationsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      from: this.from,
      to: this.to,
      cc: this.cc,
      bcc: this.bcc,
      subject: this.subject,
      text: this.text,
      html: this.html,
      attachments: this.attachments,
      replyTo: this.replyTo,
      inReplyTo: this.inReplyTo,
      references: this.references,
      attachDataUrls: this.attachDataUrls,
      watchHtml: this.watchHtml,
      icalEvent: this.icalEvent,
      alternatives: this.alternatives,
      encoding: this.encoding,
      raw: this.raw,
      textEncoding: this.textEncoding,
      priority: this.priority,
      headers: this.headers,
      messageId: this.messageId,
      list: this.list,
      disableFileAccess: this.disableFileAccess,
      disableUrlAccess: this.disableUrlAccess,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('EmailNotifications', emailNotificationsSchema)

export const schema = model.schema
export default model
