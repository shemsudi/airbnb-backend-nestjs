import { IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber(null, { message: 'phoneNumber must be a valid phone number' })
  phoneNumber: string;
}
