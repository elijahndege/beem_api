import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MccMncCapture } from './MccMncCapture.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MccMncCapture],
})
export class AppModule { }
