import { Controller, Get } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Get()
  async findAll() {
    return this.listingService.findAll();
  }
}
