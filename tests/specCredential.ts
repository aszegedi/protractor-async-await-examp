import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';
import { CREDENTIAL_NAME, OS_APIFACING, OS_AUTH_URL, OS_KEYSTONE, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME } from '../environment/environment';
import { ProtractorHelper } from '../helpers/protractor.helper';

describe('Cloudbreak Credential examples', () => {

    describe('where new OpenStack credential', () => {
        const credentialName = `${CREDENTIAL_NAME}-credential`;

        afterAll(async () => {
            await ProtractorHelper.deleteAllFromTable(CREDENTIAL_NAME);
            await ProtractorHelper.isItemPresentInTable(CREDENTIAL_NAME);
        });

        it('should be created successfully', async () => {
            await ProtractorHelper.openPage('getstarted');
            await CredentialCreateWizard.createOpenStackCredential({
                keystoneVersion: OS_KEYSTONE,
                name: credentialName,
                user: OS_USERNAME,
                password: OS_PASSWORD,
                tenantName: OS_TENANT_NAME,
                endpoint: OS_AUTH_URL,
                apiFacing: OS_APIFACING.charAt(0).toUpperCase() + OS_APIFACING.slice(1)
            });

            await ProtractorHelper.openPage('credentials');

            const countCredentialWithName = await ProtractorHelper.isItemPresentInTable(credentialName);

            await expect(countCredentialWithName).toEqual(1);
        });
    });
});
