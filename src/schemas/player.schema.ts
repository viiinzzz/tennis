import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { SexKind } from './sex-kind.enum';
import { isUrl } from './validation.regex';
import { Country, CountrySchema } from './country.schema';
import { PlayerData, PlayerDataSchema } from './player-data.schema';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ alias: 'shortname', required: true, validate: /^[A-Z]\.[A-Z]{3}$/ })
  _id: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ type: String, required: true, enum: Object.values(SexKind) })
  sex!: SexKind;

  @Prop({ validate: isUrl })
  picture?: string;

  //
  @Prop({ type: CountrySchema, required: true })
  country: Country;

  @Prop({ type: PlayerDataSchema, required: true })
  data: PlayerData;
  //

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
