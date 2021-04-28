import { Body, Controller, Get, Query } from '@nestjs/common';
import { MccMncCapture } from './MccMncCapture.service';

@Controller()
export class AppController {
  constructor(private readonly mccMncCapture: MccMncCapture) { }

  @Get('')
  filterData(
    @Query('mcc') mcc: number,
    @Query('mnc') mnc: number,
    @Query('country') country: string,
  ): Promise<void | any[]> {
    return this.mccMncCapture.filterData(mcc, mnc, country);
  }
  @Get('initial')
  initialCrawl(
    @Body('sourceId') sourceId: string
  ): Promise<void | any[]> {
    return this.mccMncCapture.initialCrawl(sourceId);
  }

}
