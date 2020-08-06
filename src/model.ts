import { Schema, Model, Document, model } from 'mongoose'

const customer: Schema<Document> = new Schema({
  card: {
    type: String,
    unique: true,
  },
  name: String,
  money: Number,
  last_location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

export interface ICustomer extends Document {
  card: string
  name: string
  money: number
  last_location?: {
    type: string
    coordinates: [number, number]
  }
}

export const DbCustomers: Model<ICustomer, {}> = model<ICustomer>('customers', customer)
