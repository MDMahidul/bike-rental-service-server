import { Model } from "mongoose";

export type TBike= {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model:string;
  brand:string;
};

// function defination
export interface BikeModel extends Model<TBike> {
  isBikeExists(id: string): Promise<TBike>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}