import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Listing } from './schemas/listing.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listing: Model<Listing>,
    @InjectConnection() private connection: Connection,
  ) {}

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    // Your transaction logic here
  }

  async findAll() {
    return this.listing.find().exec();
  }
}
