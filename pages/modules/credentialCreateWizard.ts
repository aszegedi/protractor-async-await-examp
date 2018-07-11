import { $, $$, browser, by, element, protractor } from 'protractor';
import { OSCredentialCreateParams } from '../../types/osCredentialCreateParams.type';
import { PageHelpers } from '../../helpers/pageHelpers';

export class CredentialCreateWizard {
    public static providerSelector = $('[data-qa="createcredential-select-provider"]');

    static async selectProvider(name: string) {
        const providerButton = await $(`[data-qa='provider-${name.toLowerCase()}']`);

        await this.providerSelector.click();
        await providerButton.click();
        await this.providerSelector.$(`img[alt="${name.toUpperCase()}"]`);
    }

    static async closeDocumentationSlide() {
        const EC = protractor.ExpectedConditions;
        const closeIcon = await $('i[data-qa*="documentation-close"]');
        const isCloseIconPresent = await closeIcon.isPresent();

        if (isCloseIconPresent) {
            await browser.wait(EC.elementToBeClickable(closeIcon), 5000, 'Documentation slide is not visible');
            await closeIcon.click();
        }
    }

    static async createOpenStackCredential(credentialCreateParams: OSCredentialCreateParams) {
        const keystoneSelector = $('[data-qa="createcredential-keystone"]');
        const nameField = $('[data-qa="createcredential-name"]');
        const userField = $('[data-qa="createcredential-user"]');
        const passwordField = $('[data-qa="createcredential-password"]');
        const tenantField = $('[data-qa="createcredential-tenant"]');
        const endpointField = $('[data-qa="createcredential-endpoint"]');
        const apiSelector = $('[data-qa="createcredential-apifacing"]');
        const createButton = $('[data-qa="createcredential-create"]');

        await this.closeDocumentationSlide();

        await PageHelpers.setDropDownValueTo(keystoneSelector, credentialCreateParams.keystoneVersion);
        await nameField.sendKeys(credentialCreateParams.name);
        await userField.sendKeys(credentialCreateParams.user);
        await passwordField.sendKeys(credentialCreateParams.password);
        await tenantField.sendKeys(credentialCreateParams.tenantName);
        await endpointField.sendKeys(credentialCreateParams.endpoint);
        await PageHelpers.setDropDownValueTo(apiSelector, credentialCreateParams.apiFacing);
        await createButton.click();
    }
}
