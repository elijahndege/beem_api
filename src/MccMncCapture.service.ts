import { BadRequestException, Injectable } from '@nestjs/common';
import CaptureBase from './util/capture-base';

@Injectable()
export class MccMncCapture extends CaptureBase {

  public sourceSlug = 'mcc-mnc-capture';
  private baseDomain = 'https://www.mcc-mnc.com';

  public async initialCrawl(sourceId?: string): Promise<void | any[]> {
    const url = `${this.baseDomain}`;
    let dataObj = {};
    try {
      const page = await this.getNewPage();
      await page.goto(url, { timeout: 0 });
      let mmcMncDetails = await page.evaluate(() => {
        let table = document.querySelector("#mncmccTable > tbody");
        let mmcMncTableRows = Array.from(table.children);
        let mmcMncInfo = mmcMncTableRows.map(mmcMncTableRow => {
          let mobileCountryCode = mmcMncTableRow.querySelector("td:nth-child(1)").textContent;
          let mobileNetworkCode = mmcMncTableRow.querySelector("td:nth-child(2)").textContent;
          let iSO = mmcMncTableRow.querySelector("td:nth-child(3)").textContent;
          let country = mmcMncTableRow.querySelector("td:nth-child(4)").textContent;
          let countryCode = mmcMncTableRow.querySelector("td:nth-child(5)").textContent;
          let Network = mmcMncTableRow.querySelector("td:nth-child(6)").textContent;
          return { mobileCountryCode, mobileNetworkCode, iSO, country, countryCode, Network };
        })
        return mmcMncInfo;
      })
      await this.cleanup()
      const fs = require('fs').promises;
      await fs.writeFile('mccmnc.json', JSON.stringify(mmcMncDetails));
      return mmcMncDetails;
    } catch (error) {
      throw new BadRequestException(`Error performing the initialCrawl on ${this.baseDomain}: ${error}`)
    }
  }
}
