import { $, $$, browser, by, element, protractor, WebElement } from 'protractor';
import { BASE_URL } from '../environment/environment';

export class PageHelpers {
    static async closeConfirmation(approve = false) {
        const EC = protractor.ExpectedConditions;
        const confirmationCancel = $('[data-qa="confirmation-cancel"]');
        const confirmationYes = $('[data-qa="confirmation-yes"]');
        const isDialogPresent = await confirmationCancel.isPresent();

        if (isDialogPresent) {
            await browser.wait(EC.elementToBeClickable(confirmationCancel), 5000, 'Confirmation dialog is not visible');
            if (isDialogPresent) approve ? await confirmationYes.click() : await confirmationCancel.click();
        }
    }

    static async getPageUrl() {
        const pageURL = await browser.getCurrentUrl();

        console.log(`The current URL is: ${pageURL}`);
        return pageURL;
    }

    static async getPageTitle() {
        return await browser.getTitle();
    }

    static async openPage(name: string) {
        await browser.get(BASE_URL + '/' + name.toLowerCase());
        await this.closeConfirmation();
    }

    static async setDropDownValueTo(selector: WebElement, name: string) {
        await selector.click();
        await element(by.cssContainingText('mat-option', name)).click();
    }

    static async fillTextAreaTo(textarea: WebElement, value: string) {
        await textarea.clear();
        await textarea.sendKeys(value);
    }

    static async isItemPresentInTable(name: string) {
        const EC = protractor.ExpectedConditions;
        const tableRow = await $(`[data-qa="${name}"]`);
        const isTableRowPresent = await tableRow.isPresent();

        if (isTableRowPresent) {
            await browser.wait(EC.visibilityOf(tableRow), 5000, `${name} row is not visible`);
            return tableRow.isDisplayed();
        } else {
            return false;
        }
    }

    static async deleteAllFromTable(name: string) {
        const selectedItems = await $$(`[data-qa*="${name}"]`);

        for (let item of selectedItems) {
            const checkbox = await selectedItems[item].$('mat-checkbox');
            const deleteIcon = await $(`[data-qa="delete"]`);

            await checkbox.click();
            await deleteIcon.click();
            await this.closeConfirmation(true);
        }
    }

    static async deleteFromTable(name: string) {
        const EC = protractor.ExpectedConditions;
        const selectedItemCheckbox = await $(`[data-qa="${name}"]`).$('mat-checkbox');
        const deleteIcon = await $(`[data-qa="delete"]`);

        await selectedItemCheckbox.click();
        await deleteIcon.click();
        await this.closeConfirmation(true);
        await browser.wait(EC.stalenessOf(selectedItemCheckbox), 20000, `${name} cannot be deleted from list`);
    }
}