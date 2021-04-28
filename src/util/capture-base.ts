import ICapture from "src/interfaces/Icapture";
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import _ from 'lodash';

export default abstract class CaptureBase implements ICapture {
    /**
     * The unique identifier for source script
     */
    public abstract sourceSlug: string;


    /**
     * The Browser object from Playwright
     */
    static browser: Browser;
    browserCtx: BrowserContext;

    constructor() {
        this.init();
    }

    /**
     * Initiates Capture base class by launching a playwright browser and setting new context
     * @param options options to pass when creating a new plawright browser context
     */
    public async init(options?: any): Promise<void> {
        try {
            const _browserOptions = { headless: false };

            if (!CaptureBase.browser) {
                CaptureBase.browser = await chromium.launch(_browserOptions);
            }
            this.browserCtx = await this.getBrowserContext(options);
        } catch (e) {
            return Promise.reject(`Error launching Browser: ${e}`);
        }
    }


    /**
     * Creates and returns a new playwright browser context.
     * @param options Options to pass when creating new browser context
     */
    protected async getBrowserContext(options?: object): Promise<BrowserContext> {
        try {
            return await CaptureBase.browser.newContext({ acceptDownloads: true });
        } catch (e) {
            return Promise.reject(`Error creating a new browser context: ${e}`);
        }
    }

    /**
     * Call this method to get a new playwright page
     */
    protected async getNewPage(): Promise<Page> {
        if (!this.browserCtx) {
            this.browserCtx = await this.getBrowserContext();
        }
        const page = await this.browserCtx.newPage();
        page.on('console', (c) => console.log(c));


        return page;
    }

    /**
     * Call this method to cleanup the browser context(s)
     * created for the current config
     */
    public async cleanup() {
        if (this.browserCtx) {
            await this.browserCtx.close();
        }

        this.browserCtx = null;
    }


    /**
     * Discovery method that returns string array with all discovered urls for the
     * type of works we are interested in scraping in from the source.
     * @param jurisdictions - may sometimes be interested in specific jurisdiction in a domain, this will be posted during request
     */
    public abstract initialCrawl(sourceId?: string): Promise<Array<any> | void>;



}