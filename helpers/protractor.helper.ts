import { $, $$, browser, by, element, protractor, WebElement } from 'protractor';
import { BASE_URL } from '../environment/environment';

export class ProtractorHelper {
    static async closeConfirmation(approve = false) {
        const EC = protractor.ExpectedConditions;
        const confirmationCancel = $('[data-qa="confirmation-cancel"]');
        const confirmationYes = $('[data-qa="confirmation-yes"]');
        const isDialogPresent = await confirmationCancel.isPresent();

        if (isDialogPresent) {
            await browser.wait(EC.elementToBeClickable(confirmationCancel), 5000, 'Confirmation dialog is not visible');
            if (isDialogPresent) approve ? await confirmationYes.click() : await confirmationCancel.click();
        }

        await browser.wait(EC.invisibilityOf(confirmationCancel), 5000, 'Confirmation dialog has not been closed');
    }

    static async getPageUrl() {
        return await browser.getCurrentUrl();
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
        return $(`[data-qa="${name}"]`).isPresent();
    }

    static async deleteAllFromTable(name: string) {
        const selectedItems = $$(`[data-qa*="${name}"]`);
        const selectedItemsCount = await selectedItems.count();

        for (let i = 0; i < selectedItemsCount; i++) {
            await selectedItems.get(0).$('mat-checkbox').click();
            await $(`[data-qa="delete"]`).click();
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