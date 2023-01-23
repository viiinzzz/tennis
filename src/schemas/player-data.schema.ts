import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { MatchResultKind } from './match-result-kind.enum';

export type PlayerDataDocument = PlayerData & Document;

@Schema()
export class PlayerData {
  @Prop({
    type: Number,
    min: 1,
    max: 1000,
    required: true,
  })
  rank: number;

  @Prop({
    type: Number,
    min: 0,
    max: 20000,
    required: true,
  })
  points: number;

  @Prop({
    type: Number,
    min: 20000,
    max: 200000,
    required: true,
  })
  weight: number;

  @Prop({
    type: Number,
    min: 100,
    max: 300,
    required: true,
  })
  height: number;

  @Prop({
    type: Number,
    min: 10,
    max: 100,
    required: true,
  })
  age: number;

  @Prop({
    type: [Number],
    // enum: Object.values(MatchResultKind),
    required: true,
  })
  last: [number];

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PlayerDataSchema = SchemaFactory.createForClass(PlayerData);
