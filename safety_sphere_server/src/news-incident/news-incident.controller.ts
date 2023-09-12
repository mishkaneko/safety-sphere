import { Controller, Post } from '@nestjs/common';
import { ScraperProvider } from './scraper.provider';

@Controller('news-incident')
export class NewsIncidentController {
  constructor(private readonly scraperProvider: ScraperProvider) {}

  @Post('/scrape-and-save')
  async scrapeAndSaveNewsData() {
    try {
      await this.scraperProvider.scrapeAndSaveNewsData();
      return { message: 'News data scraped and saved successfully' };
    } catch (error) {
      console.error('Error scraping and saving news data:', error.message);
      return { error: 'Failed to scrape and save news data' };
    }
  }
}
