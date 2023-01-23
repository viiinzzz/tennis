import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class CountryRatioItem {
  @Prop()
  code: string;

  @Prop()
  ratio: number;
}
