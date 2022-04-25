import mongoose, { Schema, model, Model } from 'mongoose';
import { IWearProduct } from '../interface';

const wearProductSchema = new Schema({
  title: { type: String, required: true },
  mark: { type: String },
  image: [{ type: String }],
  description: { type: String, required: true },
  inStock: { type: Number, required: true, default: 0 },
  sizes: [{ type: String, enum: { values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], message: '{VALUE} no es un tamaño permitido' } } ],
  slug: { type: String, required: true, unique: true },
  line: { type: String, required: true },
  category: { type: String,enum: { values: ['men', 'women', 'kid', 'unisex'], message: '{VALUE} no es una categoria válida' }},
  subCategory: { type: String, enum: { values: ['chamarras','pantalones','poleras','camisas'], message: '{VALUE} no es un tipo válido' } },
  price: { type: Number, required: true, default: 0 },
  oldPrice: { type: Number, required: true, default: 0 },
  tags: [{ type: String }],
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: Boolean, default: true, required: true },
}, {
  timestamps: true
});

wearProductSchema.methods.toJSON = function() {
  const { __v, ...data } = this.toObject();
  return data;
}
wearProductSchema.index({ title: 'text', tags: 'text' });

export const WearProduct: Model<IWearProduct> = mongoose.models.WearProduct || model('WearProduct', wearProductSchema);
