import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import { SearchPage } from '../pages/search-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
let searchPage: SearchPage;
let searchTerm: string;
const pageUrl = /.*intro/;

test.beforeAll(async ({ page }) => {
    searchTerm = 'Tests';
});

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
    searchPage = new SearchPage(page);
}

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
    });

    test('get started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        topMenuPage.assertPageUrl(pageUrl);
    });

    test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });

        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});

test.describe('Playwright search', () => {

    test('search for valid term', async ({ page }, testInfo) => {
        await clickGetStarted(page);
        await topMenuPage.openSearchPageMouse();
        await searchPage.searchFor(searchTerm);
        await searchPage.assertSearchResultsVisible(searchTerm);

    });
})