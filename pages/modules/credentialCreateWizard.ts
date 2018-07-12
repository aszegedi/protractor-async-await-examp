import { $, browser, protractor } from 'protractor';
import { OSCredentialCreateParams } from '../../types/osCredentialCreateParams.type';
import { ProtractorHelper } from '../../helpers/protractor.helper';
import { AWSCredentialCreateParams } from '../../types/awsCredentialCreateParams.type';
import { AzureCredentialCreateParams } from '../../types/azureCredentialCreateParams.type';
import { GCPCredentialCreateParams } from '../../types/gcpCredentialCreateParams.type';
import * as path from 'path';

export class CredentialCreateWizard {
    public static providerSelector = $('[data-qa="createcredential-select-provider"]');

    static async selectProvider(name: string) {
        const EC = protractor.ExpectedConditions;

        await this.providerSelector.click();
        await $(`[data-qa='provider-${name.toLowerCase()}']`).click();

        await browser.wait(EC.visibilityOf($(`img[alt="${name.toUpperCase()}"]`)), 5000, `${name} provider is not the selected one`);
    }

    static async closeDocumentationSlide() {
        const EC = protractor.ExpectedConditions;
        const closeIcon = $('i[data-qa*="documentation-close"]');

        if (await closeIcon.isPresent()) {
            await browser.wait(EC.elementToBeClickable(closeIcon), 5000, 'Documentation slide has not been opened');
            await closeIcon.click();
        }

        await browser.wait(EC.invisibilityOf(closeIcon), 5000, 'Documentation slide has not been closed');
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

        await this.selectProvider('openstack');
        await this.closeDocumentationSlide();

        await ProtractorHelper.setDropDownValueTo(keystoneSelector, credentialCreateParams.keystoneVersion);
        await nameField.sendKeys(credentialCreateParams.name);
        await userField.sendKeys(credentialCreateParams.user);
        await passwordField.sendKeys(credentialCreateParams.password);
        await tenantField.sendKeys(credentialCreateParams.tenantName);
        await endpointField.sendKeys(credentialCreateParams.endpoint);
        await ProtractorHelper.setDropDownValueTo(apiSelector, credentialCreateParams.apiFacing);
        await createButton.click();
    }

    static async createAWSCredential(credentialCreateParams: AWSCredentialCreateParams) {
        const typeSelector = $('[data-qa="createcredential-role"]');
        const nameField = $('[data-qa="createcredential-name"]');
        const roleARNField = $('[data-qa="createcredential-rolearn"]');
        const createButton = $('[data-qa="createcredential-create"]');

        await this.selectProvider('aws');
        await this.closeDocumentationSlide();

        await ProtractorHelper.setDropDownValueTo(typeSelector, credentialCreateParams.credentialType);
        await nameField.sendKeys(credentialCreateParams.name);
        await roleARNField.sendKeys(credentialCreateParams.roleArn);
        await createButton.click();
    }

    static async createAzureCredential(credentialCreateParams: AzureCredentialCreateParams) {
        const typeSelector = $('[data-qa="createcredential-type"]');
        const nameField = $('[data-qa="createcredential-name"]');
        const subscriptionIdField = $('[data-qa="createcredential-subscriptionid"]');
        const tenantIdField = $('[data-qa="createcredential-tenantid"]');
        const appIdField = $('[data-qa="createcredential-appid"]');
        const appPasswordField = $('[data-qa="createcredential-password"]');
        const createButton = $('[data-qa="createcredential-create"]');

        await this.selectProvider('azure');
        await this.closeDocumentationSlide();

        await ProtractorHelper.setDropDownValueTo(typeSelector, credentialCreateParams.credentialType);
        await this.closeDocumentationSlide();

        await nameField.sendKeys(credentialCreateParams.name);
        await subscriptionIdField.sendKeys(credentialCreateParams.subscriptionId);
        await tenantIdField.sendKeys(credentialCreateParams.tenantId);
        await appIdField.sendKeys(credentialCreateParams.appId);
        await appPasswordField.sendKeys(credentialCreateParams.appPassword);
        await createButton.click();
    }

    static async createGCPCredential(credentialCreateParams: GCPCredentialCreateParams) {
        const keySelector = $('[data-qa="createcredential-keytype"]');
        const nameField = $('[data-qa="createcredential-name"]');
        const projectIdField = $('[data-qa="createcredential-projectid"]');
        const serviceAccountEmailField = $('[data-qa="createcredential-serviceaccountemail"]');
        const fileInput = $('[data-qa="createcredential-fileinput"]');
        const uploadFileButton = $('[data-qa="createcredential-fileupload"]');
        const createButton = $('[data-qa="createcredential-create"]');
        const absolutePath = path.resolve(__dirname, credentialCreateParams.filePath);

        await this.selectProvider('gcp');
        await this.closeDocumentationSlide();

        await ProtractorHelper.setDropDownValueTo(keySelector,credentialCreateParams.keyType);
        await nameField.sendKeys(credentialCreateParams.name);
        await projectIdField.sendKeys(credentialCreateParams.projectId);
        await serviceAccountEmailField.sendKeys(credentialCreateParams.serviceAccountEmail);
        await fileInput.sendKeys(absolutePath);
        await uploadFileButton.click();
        await createButton.click();
    }
}
