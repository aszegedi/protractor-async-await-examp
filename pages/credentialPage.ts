import { BasePage } from "./basePage";
import { $, browser, protractor } from 'protractor';

export class CredentialPage extends BasePage {
    public static createButton = $('[data-qa="credentials-create"]');
    public static refreshButton = $('[data-qa="credential-count"] i');

    static async deleteCredential(name: string) {
        const selectCredentialCheckbox = $(`[data-qa='${name}'] mat-checkbox`);
        const deleteIcon = $('[data-qa="delete"]');
        const confirmationYes = $('[data-qa="confirmation-yes"]');

        await selectCredentialCheckbox.click();
        await deleteIcon.click();
        await confirmationYes.click();
        await this.refreshButton.click();
    }

    static async isCredentialDisplayed(name: string) {
        const EC = protractor.ExpectedConditions;
        await this.refreshButton.click();

        return await browser.wait(EC.presenceOf($(`[data-qa='${name}']`)), 5000);
    }

    static async isCredentialDeleted(name: string) {
        const EC = protractor.ExpectedConditions;

        return await browser.wait(EC.stalenessOf($(`[data-qa='${name}']`)), 5000);
    }
}