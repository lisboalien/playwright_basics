import { Page, expect, Locator } from "@playwright/test";

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly firstSearchResult: Locator;
    readonly searchInputPlaceholder: string = 'Search docs';

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search docs');
        this.firstSearchResult = page.locator('#docsearch-item-0 .DocSearch-Hit-title');
    }

    async searchFor(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchInput.press('Enter');
        await this.searchInput.click();
    }

    async assertSearchResultsVisible(searchTerm: string,) {
        await expect(this.firstSearchResult).toContainText(searchTerm.toLowerCase());
    }

}