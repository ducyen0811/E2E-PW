export abstract class BooksPage {
  abstract open(): Promise<void>;
  abstract search(keyword: string): Promise<void>;
  abstract openBookByTitle(title: string): Promise<void>;
  abstract resultsContain(text: string): Promise<boolean>;
}
