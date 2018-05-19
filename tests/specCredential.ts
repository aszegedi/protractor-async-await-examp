import { BasePage } from '../pages/basePage';
import { CredentialPage } from '../pages/credentialPage';
import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';
import { OS_APIFACING, OS_AUTH_URL, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';
import { LoginPage } from '../pages/loginPage';

const basePage = new BasePage();
const loginPage = new LoginPage();
const credentialPage = new CredentialPage();
const wizard = new CredentialCreateWizard();

describe('Cloudbreak Credential examples', () => {
    const credentialName = 'autotesting-os';

    describe('where new OpenStack credential', () => {
        const keystoneVersion = 'v2';
        const user = OS_USERNAME;
        const password = OS_PASSWORD;
        const tenantName = OS_TENANT_NAME;
        const endpoint = OS_AUTH_URL;
        const apiFacing = OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1);

        it('should be created successfully', async () => {
            await basePage.openPage('getstarted');
            await wizard.selectProvider('openstack');
            await wizard.createOpenStackCredential(keystoneVersion, credentialName, user, password, tenantName, endpoint, apiFacing);

            await basePage.openPage('credentials');

            expect(await credentialPage.isCredentialDisplayed(credentialName)).toBeTruthy();
        });

        it('should be deleted successfully', async () => {
            await credentialPage.deleteCredential(credentialName);

            expect(await credentialPage.isCredentialDeleted(credentialName)).toBeTruthy();
        });
    });
});
