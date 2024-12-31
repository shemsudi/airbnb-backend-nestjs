import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

export class CreateUserDto {
  id: number;
  googleId?: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];

  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName?: string;
  lastName?: string;
  isOptOutMarketing?: boolean;
  birthday?: Date;
}
export class FindOneParams {
  @IsNumberString()
  id: number;
}
