import { $, browser, protractor } from 'protractor';
import { ClusterCreateParams } from '../../types/clusterCreateParams.type';
import { ClusterCreateFlags } from '../../types/clusterCreateFlags.type';
import { PageHelpers } from '../../helpers/pageHelpers';

export class ClusterCreateWizard {
    public static templateSwitch = $('[data-qa="createcluster-mode"] i');
    public static blueprintSelector = $('[data-qa="createcluster-general-blueprint"]');
    public static clusterNameField = $('[data-qa="createcluster-general-name"]');

    static async setAdvancedTemplate() {
        await this.templateSwitch.click();
    }

    static async clickNextOnPage(title: string) {
        const EC = protractor.ExpectedConditions;
        const pageTitle = $('[data-qa="createcluster-title"]');
        const nextButton = $('[data-qa="createcluster-next"]');

        await browser.wait(EC.textToBePresentInElement(pageTitle, title), 5000, `${title} does not present on the page`);
        await browser.wait(EC.elementToBeClickable(nextButton), 20000, 'Next button is not present on the page or still disabled');
        await nextButton.click();
    }

    static async selectBaseImage() {
        await $('[data-qa="imagetype-select"]').click();
        await $('[data-qa="image-base"]').click();
    }

    static async disableGatewayTopology() {
        await $('[data-qa="createcluster-gateway-slide"]').click();
    }

    static async setAmbariCredentials(user: string, password: string) {
        const userField = $('[data-qa="createcluster-security-user"]');
        const passwordField = $('[data-qa="createcluster-security-password"]');
        const confirmPasswordField = $('[data-qa="createcluster-security-confirmpassword"]');

        await userField.clear();
        await userField.sendKeys(user);
        await passwordField.clear();
        await passwordField.sendKeys(password);
        await confirmPasswordField.clear();
        await confirmPasswordField.sendKeys(password);
    }

    static async createCluster(clusterCreateParams: ClusterCreateParams, flags: ClusterCreateFlags = { isAdvanced: true }) {
        const EC = protractor.ExpectedConditions;
        const credentialSelector = $('[data-qa="createcluster-general-credential"]');
        const isCredentialSelectorPresent = await credentialSelector.isPresent();

        browser.driver.manage().window().maximize();
        
        if (flags.isAdvanced) {
            await this.setAdvancedTemplate();
        }
        if (isCredentialSelectorPresent) {
            await browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential selector is not available');
            await PageHelpers.setDropDownValueTo(credentialSelector, clusterCreateParams.credentialName);
        }
        await this.clusterNameField.sendKeys(clusterCreateParams.clusterName);
        if (!!clusterCreateParams.blueprintName) {
            await PageHelpers.setDropDownValueTo(this.blueprintSelector, clusterCreateParams.blueprintName);
        }
        await this.clickNextOnPage('General Configuration');
        if (flags.isAdvanced) {
            await this.selectBaseImage();
            await this.clickNextOnPage('Image Settings');
        }
        await this.clickNextOnPage('Hardware and Storage');
        if (flags.isAdvanced && flags.isCloudStorageSupported) {
            await this.clickNextOnPage('Cloud Storage');
        }
        if (flags.isAdvanced) {
            await this.clickNextOnPage('Recipes');
            await this.clickNextOnPage('Configure Authentication');
        }
        await this.disableGatewayTopology();
        await this.clickNextOnPage('Gateway Topology');
        await this.clickNextOnPage('Network');
        await this.setAmbariCredentials(clusterCreateParams.user, clusterCreateParams.password);
        if (clusterCreateParams.sshKeyString) {
            const sshNewRadioButton = $('[data-qa="createcluster-new-sshkey"]');
            const isSshNewRadioButtonPresent = await sshNewRadioButton.isPresent();
            const sshTextarea = $('[data-qa="createcluster-security-sshkey"]');

            if (isSshNewRadioButtonPresent) {
                await browser.wait(EC.elementToBeClickable(sshNewRadioButton), 5000, 'New SSH Key radio button is not available');
                await sshNewRadioButton.click();
                await PageHelpers.fillTextAreaTo(sshTextarea, clusterCreateParams.sshKeyString);
            }
        } else {
            const sshSelector = $('[data-qa="createcluster-security-sshkey"]');
            const sshSelectorPresent = await sshSelector.isPresent();

            if (sshSelectorPresent) {
                await browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key Name selector is not available');
                await PageHelpers.setDropDownValueTo(sshSelector, clusterCreateParams.sshKeyName);
            }
        }

        return await $('[data-qa="createcluster-create"]').click();
    }
}
