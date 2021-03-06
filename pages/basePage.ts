import { $, browser, protractor } from 'protractor';

export class BasePage {
    public static logoutIcon = $('[data-qa="header-logout"]');
    public static confirmation = $('[data-qa="confirmation-yes"]');

    static async isMenuItemPresent(menuClassName: string, isSubmenu = false, subMenuClassName?: string) {
        if (isSubmenu) {
            await $(`*[class*='${menuClassName}']`).click();
            return await $(`*[class*='${subMenuClassName}']`).isPresent();
        } else {
            return await $(`*[class*='${menuClassName}']`).isPresent();
        }
    }

    static async logOut() {
        await this.logoutIcon.click();
        await this.confirmation.click();
    }
}
