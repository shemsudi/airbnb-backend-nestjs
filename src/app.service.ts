import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.sevice';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}
  getHello(): string {
    // this.userService.sayHello('My name is getRoot');

    return 'Hello World!';
  }
}
