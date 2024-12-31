import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SecurityCameras {
  @Prop()
  isAvailable?: boolean;

  @Prop()
  description?: string;
}

@Schema()
export class LegalInfo {
  @Prop()
  hostingType?: string;

  @Prop({ type: SecurityCameras })
  securityCameras?: SecurityCameras;

  @Prop()
  noiseMonitors?: boolean;

  @Prop()
  weapons?: boolean;
}

export const LegalInfoSchema = SchemaFactory.createForClass(LegalInfo);
