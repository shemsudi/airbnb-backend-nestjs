import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { LegalInfo, LegalInfoSchema } from './legalInfo.schema';

// title?: string;
//   uuid: string;
//   lastPage?: string;
//   isCompleted?: boolean;
//   structure?: string;
//   privacyType?: string;
//   description?: string;
//   visibility?: string;
//   highlights?: string[];
//   instantBook?: string;
//   guests?: number;
//   beds?: number;
//   bedrooms?: number;
//   bathrooms?: number;
//   location: Location;
//   photos?: string[];
//   amenities?: string[];
//   uniqueAmenities?: string[];
//   safetyAmenities?: string[];
//   houseRules?: string[];
//   pricing?: Pricing;
//   availability?: {
//     startDate?: Date;
//     endDate?: Date;
//     minStay?: number;
//     maxStay?: number;
//   };
//   discount?: Discount;
//   legalInfo?: LegalInfo;
//   user?: Schema.Types.ObjectId;
//   created_at?: Date;
//   updated_at?: Date;

@Schema()
export class Listing {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  uuid: string;

  @Prop({ required: false })
  lastPage: string;

  @Prop({ required: false })
  isCompleted: boolean;

  @Prop({ required: false })
  structure: string;

  @Prop({ required: false })
  privacyType: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  visibility: string;

  @Prop({ type: [String], required: false })
  highlights: string[];

  @Prop({ required: false })
  instantBook: string;

  @Prop({ required: false })
  guests: number;

  @Prop({ required: false })
  beds: number;

  @Prop({ required: false })
  bedrooms: number;

  @Prop({ required: false })
  bathrooms: number;

  @Prop({ type: Object, required: false })
  location: Record<string, any>;

  @Prop({ type: [String], required: false })
  photos: string[];

  @Prop({ type: [String], required: false })
  amenities: string[];

  @Prop({ type: [String], required: false })
  uniqueAmenities: string[];

  @Prop({ type: [String], required: false })
  safetyAmenities: string[];

  @Prop({ type: [String], required: false })
  houseRules: string[];

  @Prop({ type: Object, required: false })
  pricing: Record<string, any>;

  @Prop(
    raw({
      type: {
        startDate: { type: Date },
        endDate: { type: Date },
        minStay: { type: Number },
        maxStay: { type: Number },
      },
      required: false,
    }),
  )
  availability?: Record<string, any>;

  @Prop(
    raw({
      type: {
        weeklyDiscount: { type: Number },
        monthlyDiscount: { type: Number },
        newLPDiscount: { type: Number },
      },
      required: false,
    }),
  )
  discount: Record<string, any>;

  @Prop({ type: [LegalInfoSchema], required: false })
  legalInfo: LegalInfo;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);

export type PersonDocumentOverride = {
  name: Types.DocumentArray<Listing>;
};
export type ListingDocument = HydratedDocument<Listing, PersonDocumentOverride>;
