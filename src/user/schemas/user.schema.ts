import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Schema.Types.ObjectId;
  @Prop()
  roles: Role[];
  @Prop()
  googleId?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  email?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  password?: string;

  @Prop()
  isAdmin?: boolean;

  @Prop()
  isOptOutMarketing?: boolean;

  @Prop()
  birthday?: Date;

  @Prop()
  created_at: Date;

  @Virtual({
    get: function (this: User) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
