import { BasePage } from "./basePage";
import { $, browser, protractor } from 'protractor';

export class CredentialPage extends BasePage {
    public createButton = $('#btnCreateCredential');
    public refreshButton = $('[data-qa="credential-count"] i');

    async deleteCredential(name: string) {
        const selectCredentialCheckbox = $('[data-qa="' + name + '"] mat-checkbox');
        const deleteIcon = $('[data-qa="delete"]');
        const confirmationYes = $('.btn.btn-primary.pull-right.text-uppercase');

        await selectCredentialCheckbox.click();
        await deleteIcon.click();
        await confirmationYes.click();
        await this.refreshButton.click();
    }

    async isCredentialDisplayed(name: string) {
        const EC = protractor.ExpectedConditions;
        await this.refreshButton.click();

        return await browser.wait(EC.presenceOf($('[data-qa="' + name + '"]')), 5000);
    }

    async isCredentialDeleted(name: string) {
        const EC = protractor.ExpectedConditions;

        return await browser.wait(EC.stalenessOf($('[data-qa="' + name + '"]')), 5000);
    }
}