import { $, browser, ElementFinder, protractor } from 'protractor';

export class BasePage {
    public static logoutIcon = $('[data-qa="header-logout"]');
    public static confirmation = $('[data-qa="confirmation-yes"]');

    static async isMenuItemPresent(menuClassName: string, isSubmenu = false, subMenuClassName?: string) {
        const EC = protractor.ExpectedConditions;
        let menuItem: ElementFinder = $(`*[class*='${menuClassName}']`);

        if (isSubmenu) {
            menuItem.click();
            menuItem = $(`*[class*='${subMenuClassName}']`);
        }
        return await browser.wait(EC.visibilityOf(menuItem), 5000, menuItem + ' menu is not visible');
    }

    static async logOut() {
        await this.logoutIcon.click();
        await this.confirmation.click();
    }
}
