import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop({ required: true, validate: /^[A-Z]{3}$/ })
  code: string;

  @Prop({ required: true })
  picture: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
