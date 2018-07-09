import { $, browser } from 'protractor';
import { BASE_URL } from '../environment/environment';

export class PageHelpers {
    static async closeConfirmation(approve = false) {
        const confirmationCancel = $('[data-qa="confirmation-cancel"]');
        const confirmationYes = $('[data-qa="confirmation-yes"]');
        const isDialogPresent = await confirmationCancel.isPresent();

        if (isDialogPresent) approve ? await confirmationYes.click() : await confirmationCancel.click();
    }

    static async getPageUrl() {
        return await browser.getCurrentUrl().then((url) => {
            console.log('The current URL is: ' + url);
            return url;
        });
    }

    static getPageTitle() {
        return browser.getTitle();
    }

    static async openPage(name: string) {
        await browser.get(BASE_URL + '/' + name.toLowerCase());

        await this.closeConfirmation();
    }
}