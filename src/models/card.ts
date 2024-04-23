import { Document, model, Schema } from 'mongoose';

interface CardDocumentInterface extends Document {
  type_: string,
  id_: number,
  name_: string,
  color_: string,
  rarity_: string,
  rules_text_: string,
  market_value_: number,
  mana_cost_: number,
  loyalty_marks_?: number
  toughness_?: number,
  power_?: number
  owner_: Schema.Types.ObjectId
}

const CardSchema = new Schema<CardDocumentInterface>({
  id_: {
    type: Number,
    unique: true,
    required: true,
  },
  name_: {
    type: String,
    required: true,
    trim: true
  },
  color_: {
    type: String,
    required: true,
    trim: true
  },
  rarity_: {
    type: String,
    required: true,
    trim: true
  },
  rules_text_: {
    type: String,
    required: true,
  },
  mana_cost_: {
    type: Number,
    required: true,
  },
  market_value_: {
    type: Number,
    required: true,
  },
  type_: {
    type: String,
    required: true,
  },
  loyalty_marks_: {
    type: Number,
  },
  toughness_: {
    type: Number,
  },
  power_: {
    type: Number,
  },
  owner_: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

export const cardModel = model<CardDocumentInterface>('Card', CardSchema);