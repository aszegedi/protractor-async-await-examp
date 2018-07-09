import { BasePage } from '../pages/basePage';
import { CredentialPage } from '../pages/credentialPage';
import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';
import { OS_APIFACING, OS_AUTH_URL, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';

describe('Cloudbreak Credential examples', () => {
    const credentialName = 'autotesting-os';

    describe('where new OpenStack credential', () => {
        const keystoneVersion = 'v2';
        const apiFacing = OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1);

        it('should be created successfully', async () => {
            await BasePage.openPage('getstarted');
            await CredentialCreateWizard.selectProvider('openstack');
            await CredentialCreateWizard.createOpenStackCredential(keystoneVersion, credentialName, OS_USERNAME, OS_PASSWORD, OS_TENANT_NAME, OS_AUTH_URL, apiFacing);

            await BasePage.openPage('credentials');

            expect(await CredentialPage.isCredentialDisplayed(credentialName)).toBeTruthy();
        });

        it('should be deleted successfully', async () => {
            await CredentialPage.deleteCredential(credentialName);

            expect(await CredentialPage.isCredentialDeleted(credentialName)).toBeTruthy();
        });
    });
});
