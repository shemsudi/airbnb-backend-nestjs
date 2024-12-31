import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.sevice';
import { Twilio } from 'twilio';

@Injectable()
export class AuthService {
  private twilioClient: Twilio;
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async signWithEmail(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const JWT_SECRET = this.configService.get('JWT_SECRET');
    const payload = {
      sub: user.firstName,
      username: user.firstName,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: JWT_SECRET,
      }),
    };
  }

  async sendOtp(phoneNumber: string): Promise<{ msg: boolean }> {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    try {
      const verification = await this.twilioClient.verify.v2
        .services(serviceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });
      console.log(verification);
      if (verification.valid) {
        return { msg: verification.valid };
      } else {
        throw new HttpException(
          'Could not send the otp. Please try again',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    } catch {
      throw new InternalServerErrorException(
        'Failed to send OTP. Please try again later.',
      );
    }
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    const user = await this.userService.findOneByPhone(phoneNumber);
    console.log('user', user);
    try {
      const verification = await this.twilioClient.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to: phoneNumber, code: code });

      if (user && verification.valid) {
        const JWT_SECRET = this.configService.get('JWT_SECRET');
        const payload = {
          sub: user.id,
          username: user.firstName,
          roles: user.roles,
        };
        return {
          access_token: await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: JWT_SECRET,
          }),
          msg: verification.valid,
        };
      }
      console.log(verification);
      return { msg: verification.valid };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
