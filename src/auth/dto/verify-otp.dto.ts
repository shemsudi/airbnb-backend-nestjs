import { IsPhoneNumber, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber(null, { message: 'phoneNumber must be a valid phone number' })
  phoneNumber: string;

  @Length(6, 6, { message: 'otp length must be 6' })
  otp: string;
}
