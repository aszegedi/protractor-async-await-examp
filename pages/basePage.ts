import { $, browser, ElementFinder, protractor } from 'protractor';
import { BASE_URL } from '../environment/environment';

export class BasePage {
    public static logoutIcon = $('[data-qa="header-logout"]');
    public static confirmation = $('[data-qa="confirmation-yes"]');

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

    static async isMenuItemPresent(menuClassName: string, isSubmenu = false, subMenuClassName?: string) {
        const EC = protractor.ExpectedConditions;
        let menuItem: ElementFinder = $(`*[class*='${menuClassName}']`);

        if (isSubmenu) {
            menuItem.click();
            menuItem = $(`*[class*='${subMenuClassName}']`);
        }
        return await browser.wait(EC.visibilityOf(menuItem), 5000, menuItem + ' menu is not visible');
    }

    static async openPage(name: string) {
        await browser.get(BASE_URL + '/' + name.toLowerCase());

        await this.closeConfirmation();
    }

    static async logOut() {
        await this.logoutIcon.click();
        await this.confirmation.click();
    }

}
