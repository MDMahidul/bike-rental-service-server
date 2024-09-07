/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TBike = {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: string;
  model: string;
  brand: string;
  isDeleted: boolean;
  mileage:string;
  image?: string;
};

// function defination
export interface BikeModel extends Model<TBike> {
  isBikeExists(id: string): Promise<boolean>;

}