import { Body, Controller, Get } from '@nestjs/common';
import { MccMncCapture } from './MccMncCapture.service';

@Controller()
export class AppController {
  constructor(private readonly mccMncCapture: MccMncCapture) { }

  @Get('initial')
  initialCrawl(
    @Body('sourceId') sourceId: string
  ): Promise<void | any[]> {
    return this.mccMncCapture.initialCrawl(sourceId);
  }
}
