import { Prop, Schema } from '@nestjs/mongoose';

import { SexKind } from './sex-kind.enum';

@Schema()
export class PlayerRankItem {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  rank!: number;
}

@Schema()
export class PlayerRankWithSexItem extends PlayerRankItem {
  @Prop()
  sex: SexKind;
}
