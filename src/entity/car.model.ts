
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Variance {
  id: number;
  name: string;
  price: string;
}

export interface Car {
  id: number;
  carname: string;
  brand: string;
  description: string;
  variance: Variance[];
}

@Schema()
export class CarDocument extends Document implements Car {
  @Prop()
  id: number;

  @Prop({ required: true })
  carname: string;

  @Prop({ required: true })
  brand: string;

  @Prop()
  description: string;

  @Prop({ type: [{ id: Number, name: String, price: String }] })
  variance: Variance[];
}

export const CarSchema = SchemaFactory.createForClass(CarDocument);
