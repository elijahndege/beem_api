export default interface ICapture {
    readonly sourceSlug: string;

    init(): Promise<void>;
    initialCrawl(sourceId?: string): Promise<string[] | void>;

}