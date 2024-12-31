import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signWithEmail(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/SendOtp')
  async sendOtp(@Body() body: Record<string, any>) {
    return this.authService.sendOtp(body.phoneNumber);
  }

  @Post('/verifyOtp')
  async verifyOtp(@Body() body: Record<string, any>) {
    return this.authService.verifyOtp(body.phone, body.otp);
  }
}
