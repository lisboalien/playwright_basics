import { Page, expect, Locator } from "@playwright/test";

export class TopMenuPage {
    readonly page: Page;
    readonly nodeLocator: Locator;
    readonly javaLocator: Locator;
    readonly javaButton: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly searchLocator: Locator;
    readonly lightModeButton: Locator;
    readonly nightModeButton: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

    constructor(page: Page) {
        this.page = page;
        this.nodeLocator = page.getByRole('button', { name: 'Node.js' });
        this.javaLocator = page.getByRole('link', { name: 'Java', exact: true });
        this.javaButton = page.getByRole('button', { name: 'Java' });
        this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
        this.javaLabel = page.getByText(this.javaDescription);
        this.searchLocator = page.getByLabel('Search');
        this.lightModeButton = page.locator('.lightToggleIcon_pyhR');
        this.nightModeButton = page.locator('.darkToggleIcon_wfgR');
    }

    async assertPageUrl(pageUrl: RegExp) {
        expect(this.page.url()).toMatch(pageUrl);
    }

    async clickJava() {
        await this.javaLocator.click();
    }

    async hoverNode() {
        await this.nodeLocator.hover();
    }

    async turnOnLightMode() {
        await this.nightModeButton.click();
    }

    async turnOnNightMode() {
        await this.lightModeButton.click();
    }

    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLocator).not.toBeVisible();
        await expect(this.nodeLabel).not.toBeVisible();
    }

    async assertJavaDescriptionVisible() {
        await expect(this.javaButton).toBeVisible();
        await expect(this.javaLabel).toBeVisible();
    }

    async openSearchPageMouse() {
        await this.searchLocator.click();
    }
}