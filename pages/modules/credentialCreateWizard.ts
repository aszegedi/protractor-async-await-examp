import { $, browser, by, element, protractor } from 'protractor';

export class CredentialCreateWizard {
    public static providerSelector = $('[data-qa="createcredential-select-provider"]');

    static async selectProvider(providerName: string) {
        const providerButton =  $(`[data-qa='provider-${providerName}']`);

        await this.providerSelector.click().then(() => {
            return providerButton.click();
        });
    }

    static async closeDocumentationSlide() {
        const EC = protractor.ExpectedConditions;
        const closeIcon = $('i[data-qa*="documentation-close"]');

        if (await browser.wait(EC.elementToBeClickable(closeIcon), 5000,'Credential Documentation slide is not visible')) await closeIcon.click();
    }

    static async createOpenStackCredential(keystoneVersion: string, name: string, user: string, password: string, tenantName: string, endpoint: string, apiFacing: string) {
        const keystoneSelector = $('[data-qa="createcredential-keystone"]');
        const nameField = $('[data-qa="createcredential-name"]');
        const userField = $('[data-qa="createcredential-user"]');
        const passwordField = $('[data-qa="createcredential-password"]');
        const tenantField = $('[data-qa="createcredential-tenant"]');
        const endpointField = $('[data-qa="createcredential-endpoint"]');
        const apiSelector = $('[data-qa="createcredential-apifacing"]');
        const createButton = $('[data-qa="createcredential-create"]');

        await this.closeDocumentationSlide();

        await keystoneSelector.click().then(() => {
            return element(by.cssContainingText('mat-option', keystoneVersion)).click();
        });
        await nameField.sendKeys(name);
        await userField.sendKeys(user);
        await passwordField.sendKeys(password);
        await tenantField.sendKeys(tenantName);
        await endpointField.sendKeys(endpoint);
        await apiSelector.click().then(() => {
            return element(by.cssContainingText('mat-option[class*="mat-option ng-star-inserted"]', apiFacing)).click();
        });
        return await createButton.click();
    }
}
