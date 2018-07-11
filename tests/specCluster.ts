import {
    AMBARI_PASSWORD,
    AMBARI_USER,
    OS_APIFACING,
    OS_AUTH_URL,
    OS_KEYSTONE,
    OS_PASSWORD,
    OS_TENANT_NAME,
    OS_USERNAME,
    SSH_KEY_NAME
} from '../environment/environment';
import { ClusterPage } from '../pages/clusterPage';
import { ClusterCreateWizard } from '../pages/modules/clusterCreateWizard';
import { ClusterDetails } from '../pages/modules/clusterDetails';
import { PageHelpers } from '../helpers/pageHelpers';
import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';

describe('Cloudbreak Cluster examples', () => {

    describe('where create new OpenStack Engineering cluster with Basic Template', () => {
        const credentialName = 'autotesting-os-cluster';
        const clusterName = 'protractor-os-cluster';

        beforeAll(async () => {
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
        });

        afterAll(async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();
        });

        it('should be done successfully', async () => {
            await PageHelpers.openPage('clusters/ref/create');

            await ClusterCreateWizard.createCluster({
                    credentialName: credentialName,
                    clusterName: clusterName,
                    user: AMBARI_USER,
                    password: AMBARI_PASSWORD,
                    sshKeyName: SSH_KEY_NAME
                },
                { isAdvanced: false, isCloudStorageSupported: false });

            expect(await ClusterPage.getWidget(clusterName)).toBeTruthy();
        });
    });
});
