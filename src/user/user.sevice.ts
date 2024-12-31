import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { INQUIRER } from '@nestjs/core';

@Injectable()
export class UserService {
  constructor(
    @Inject(INQUIRER) private parentClass: object,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(createUserDto.email);
    console.log('user', user);
    if (user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const createdUser = new this.userModel(createUserDto);
    console.log('createdUser', createdUser);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById({ id: id }).exec();
  }

  async findOneByPhone(phoneNumber: string): Promise<User> {
    return this.userModel.findOne({ phoneNumber: phoneNumber }).exec();
  }

  async deleteById(id: string): Promise<{ msg: string }> {
    return this.userModel.findByIdAndDelete({ id });
  }
}
