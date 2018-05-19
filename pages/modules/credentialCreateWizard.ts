import { PageUtils } from '../../utils/pageUtils';
import { $, by, element } from 'protractor';

export class CredentialCreateWizard extends PageUtils {
    public createCredentialApp = $('app-get-started');
    public providerSelector = this.createCredentialApp.$('.cb-credential-create-started-select-provider-switch');

    async selectProvider(providerName: string) {
        let name = (providerName.toLowerCase() == 'azure') ? 'msa' : providerName.toLowerCase();
        const providerButton =  $('div[class="option"] img[src*="' + name + '.png"]');

        await this.providerSelector.click().then(() => {
            return providerButton.click();
        });
    }

    async createOpenStackCredential(keystoneVersion: string, name: string, user: string, password: string, tenantName: string, endpoint: string, apiFacing: string) {
        const keystoneSelector = $('#keystone-version-dropdown');
        const nameField = $('#name');
        const userField = $('#user');
        const passwordField = $('#password');
        const tenantField = $('#tenantName');
        const endpointField = $('#endpoint');
        const apiSelector = $('#cb-credential-create-openstack-api-facing-select');
        const createButton = $('#cb-credential-create-submit-button');

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
