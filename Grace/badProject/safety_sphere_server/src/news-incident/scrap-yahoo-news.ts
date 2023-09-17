import { Browser, Page, chromium } from 'playwright';
import { listOfHKLocations } from './list-of-hk-locations';

const newsKeywords = ['傷人', '非禮', '盜竊', '高空墮物', '野豬'];

let dataArr = [];

export async function scrapNewsData(newsKeywords: string[]) {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto('https://hk.news.yahoo.com/hong-kong/', {
    waitUntil: 'domcontentloaded',
  });
  for (let keyword of newsKeywords) {
    let data = await scrapeByKeyword(page, keyword);
    dataArr.push(data);
  }
  await browser.close();
  return dataArr;
}

scrapNewsData(newsKeywords).catch((e) => {
  console.error(e);
});

async function scrapeByKeyword(page: Page, keyword: string) {
  await page.getByLabel('搜尋查詢').fill(keyword);
  await page.evaluate(() => {
    document
      .querySelectorAll('#stream-container-scroll-template .StreamMegaItem')
      .forEach((e) => e.remove());
  });
  await page.getByLabel('搜尋', { exact: true }).click();
  await page.waitForSelector(
    '#stream-container-scroll-template .StreamMegaItem',
  );

  let items = await page.evaluate(
    ({ listOfHKLocations, keyword }) => {
      return Array.from(
        document.querySelectorAll<HTMLDivElement>(
          '#stream-container-scroll-template .StreamMegaItem',
        ),
        (element) => {
          const h3 = element.querySelector('h3');

          const title = h3.textContent;
          const source = h3.previousElementSibling.textContent;
          const summary = h3.nextElementSibling.textContent;

          const website = decodeURI(
            element.querySelector<HTMLAnchorElement>('h3 > a').href,
          );
          const locations = listOfHKLocations.filter((location) =>
            title.includes(location),
          )[0];

          function getIncidentId(keyword) {
            switch (keyword) {
              case '傷人':
                return 1;
              case '非禮':
                return 3;
              case '盜竊':
                return 5;
              case '高空墮物':
                return 6;
              case '野豬':
                return 7;
              default:
                console.log('Wrong keyword');
            }
          }

          return {
            incidentType: getIncidentId(keyword),
            title,
            website,
            source,
            summary,
            locations,
            scrapDate: new Date().toISOString(),
          };
        },
      );
    },
    { listOfHKLocations, keyword },
  );

  // Skip news without location
  items = items.filter((item) => item.locations !== undefined);

  return items;
}
