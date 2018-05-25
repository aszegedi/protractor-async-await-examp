import { $, browser } from "protractor";
import { BASE_URL } from '../environment/environment';

export class BasePage {
    public logoutIcon = $('#logoutBtn');
    public confirmation = $('[data-qa="confirmation-yes"]');
    public menu = $('app-menu');

    async getPageUrl() {
        return await browser.getCurrentUrl().then((url) => {
            console.log('The current URL is: ' + url);
            return url;
        });
    }

    getPageTitle() {
        return browser.getTitle();
    }

    isMenuItemPresent(menuItemClass: string) {
        return this.menu.$(menuItemClass);
    }

    async openPage(name: string) {
        await browser.get(BASE_URL + '/' + name.toLowerCase());
    }

    async logOut() {
        await this.logoutIcon.click();
        await this.confirmation.click();
    }

}
