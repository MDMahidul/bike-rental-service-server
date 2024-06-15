import { Schema, model } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const bikeSchema = new Schema<TBike,BikeModel>(
  {
    name: { type: String, required: [true, 'Bike name is required!'] },
    description: {
      type: String,
      required: [true, 'Bike details is required!'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required!'],
    },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: [true, 'Bike cc is required!'] },
    year: { type: Number, required: [true, 'Bike year is required!'] },
    model: { type: String, required: [true, 'Bike model is required!'] },
    brand: { type: String, required: [true, 'Bike brand is required!'] },
  },
  {
    timestamps: false,
    toJSON: {
      // Remove the password from the output
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Query middleware
// only get the available bikes
bikeSchema.pre('find', function (next) {
  this.find({ isAvailable: { $ne: false } });
  next();
});

// create static function
bikeSchema.statics.isBikeExists = async function (id: string) {
  return await Bike.findById(id);
};

export const Bike = model<TBike,BikeModel>('Bike', bikeSchema);
