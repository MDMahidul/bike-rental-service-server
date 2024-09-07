import { Schema, model } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const bikeSchema = new Schema<TBike, BikeModel>(
  {
    name: { type: String, required: [true, 'Bike name is required!'] },
    description: {
      type: String,
      required: [true, 'Bike details is required!'],
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required!'],
    },
    mileage: {
      type: String,
      required: [true, 'Mileage is required!'],
    },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: [true, 'Bike cc is required!'] },
    year: { type: String, required: [true, 'Bike year is required!'] },
    model: { type: String, required: [true, 'Bike model is required!'] },
    brand: { type: String, required: [true, 'Bike brand is required!'] },
  },
  {
    timestamps: true,
  /*   toJSON: {
      
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    }, */
  },
);

// Query middleware
// only get the available bikes
/* bikeSchema.pre('find', function (next) {
  this.find({ isAvailable: { $ne: false } });
  next();
}); */

bikeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// create static function
bikeSchema.statics.isBikeExists = async function (id: string) {
  return await Bike.findById(id);
};

export const Bike = model<TBike,BikeModel>('Bike', bikeSchema);
