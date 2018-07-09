import { CredentialPage } from '../pages/credentialPage';
import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';
import { OS_APIFACING, OS_AUTH_URL, OS_KEYSTONE, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';
import { PageHelpers } from '../helpers/pageHelpers';

describe('Cloudbreak Credential examples', () => {
    const credentialName = 'autotesting-os';

    describe('where new OpenStack credential', () => {
        it('should be created successfully', async () => {
            await PageHelpers.openPage('getstarted');
            await CredentialCreateWizard.selectProvider('openstack');
            await CredentialCreateWizard.createOpenStackCredential({
                keystoneVersion: OS_KEYSTONE,
                name: credentialName,
                user: OS_USERNAME,
                password: OS_PASSWORD,
                tenantName: OS_TENANT_NAME,
                endpoint: OS_AUTH_URL,
                apiFacing: OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1)
            });

            await PageHelpers.openPage('credentials');

            expect(await CredentialPage.isCredentialDisplayed(credentialName)).toBeTruthy();
        });

        it('should be deleted successfully', async () => {
            await CredentialPage.deleteCredential(credentialName);

            expect(await CredentialPage.isCredentialDeleted(credentialName)).toBeTruthy();
        });
    });
});
