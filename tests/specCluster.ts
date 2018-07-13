import {
    AMBARI_PASSWORD, AMBARI_USER,
    ARM_APP_ID, ARM_PASSWORD, ARM_SUBSCRIPTION_ID, ARM_TENANT_ID,
    AWS_ROLE_ARN,
    GCP_ACCOUNT_EMAIL, GCP_PROJECT, P12_PATH,
    OS_APIFACING, OS_AUTH_URL, OS_KEYSTONE, OS_PASSWORD, OS_TENANT_NAME, OS_USERNAME,
    SSH_KEY, SSH_KEY_NAME, CLUSTER_NAME, CREDENTIAL_NAME
} from '../environment/environment';
import { ClusterPage } from '../pages/clusterPage';
import { ClusterCreateWizard } from '../pages/modules/clusterCreateWizard';
import { ClusterDetails } from '../pages/modules/clusterDetails';
import { ProtractorHelper } from '../helpers/protractor.helper';
import { CredentialCreateWizard } from '../pages/modules/credentialCreateWizard';

describe('Cloudbreak Cluster examples', () => {

    describe('where create new OpenStack Engineering cluster with Basic Template', () => {
        const credentialName = `${CREDENTIAL_NAME}-os-cluster`;
        const clusterName = `${CLUSTER_NAME}-os-cluster`;

        beforeAll(async () => {
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
            await ProtractorHelper.openPage('clusters/ref/create');
        });

        it('should be done successfully', async () => {
            await ClusterCreateWizard.createCluster({
                    credentialName: credentialName,
                    clusterName: clusterName,
                    user: AMBARI_USER,
                    password: AMBARI_PASSWORD,
                    sshKeyName: SSH_KEY_NAME
                },
                { isAdvanced: false, isCloudStorageSupported: false });

            const isClusterCreated = await ClusterPage.isWidgetPresent(clusterName);

            await expect(isClusterCreated).toBeTruthy();
        });

        it('should be force terminate successfully', async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();

            const isClusterStatus = await ClusterPage.getWidgetStatus(clusterName, 'Terminating');

            await expect(isClusterStatus == 'Terminating' || isClusterStatus == 'Stale').toBe(true);
        });
    });

    describe('where create new AWS cluster with Basic Template', () => {
        const credentialName = `${CREDENTIAL_NAME}-aws-cluster`;
        const clusterName = `${CLUSTER_NAME}-aws-cluster`;

        beforeAll(async () => {
            await ProtractorHelper.openPage('getstarted');
            await CredentialCreateWizard.createAWSCredential({
                credentialType: 'Role based',
                name: credentialName,
                roleArn: AWS_ROLE_ARN
            });
            await ProtractorHelper.openPage('clusters/ref/create');
        });

        it('should be done successfully', async () => {
            await ClusterCreateWizard.createCluster({
                    credentialName: credentialName,
                    clusterName: clusterName,
                    user: AMBARI_USER,
                    password: AMBARI_PASSWORD,
                    sshKeyString: SSH_KEY
                },
                { isAdvanced: false, isCloudStorageSupported: false });

            const isClusterCreated = await ClusterPage.isWidgetPresent(clusterName);

            await expect(isClusterCreated).toBeTruthy();
        });

        it('should be force terminate successfully', async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();

            const isClusterStatus = await ClusterPage.getWidgetStatus(clusterName, 'Terminating');

            await expect(isClusterStatus == 'Terminating' || isClusterStatus == 'Stale').toBe(true);
        });
    });

    describe('where create new Azure cluster with Basic Template', () => {
        const credentialName = `${CREDENTIAL_NAME}-azure-cluster`;
        const clusterName = `${CLUSTER_NAME}-azure-cluster`;

        beforeAll(async () => {
            await ProtractorHelper.openPage('getstarted');
            await CredentialCreateWizard.createAzureCredential({
                credentialType: 'App based',
                name: credentialName,
                subscriptionId: ARM_SUBSCRIPTION_ID,
                tenantId: ARM_TENANT_ID,
                appId: ARM_APP_ID,
                appPassword: ARM_PASSWORD
            });
            await ProtractorHelper.openPage('clusters/ref/create');
        });

        it('should be done successfully', async () => {
            await ClusterCreateWizard.createCluster({
                    credentialName: credentialName,
                    clusterName: clusterName,
                    user: AMBARI_USER,
                    password: AMBARI_PASSWORD,
                    sshKeyString: SSH_KEY
                },
                { isAdvanced: false, isCloudStorageSupported: false });

            const isClusterCreated = await ClusterPage.isWidgetPresent(clusterName);

            await expect(isClusterCreated).toBeTruthy();
        });

        it('should be force terminate successfully', async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();

            const isClusterStatus = await ClusterPage.getWidgetStatus(clusterName, 'Terminating');

            await expect(isClusterStatus == 'Terminating' || isClusterStatus == 'Stale').toBe(true);
        });
    });

    describe('where create new GCP cluster with Basic Template', () => {
        const credentialName = `${CREDENTIAL_NAME}-gcp-cluster`;
        const clusterName = `${CLUSTER_NAME}-gcp-cluster`;

        beforeAll(async () => {
            await ProtractorHelper.openPage('getstarted');
            await CredentialCreateWizard.createGCPCredential({
                keyType: 'P12 (for backward compatibility)',
                name: credentialName,
                projectId: GCP_PROJECT,
                serviceAccountEmail: GCP_ACCOUNT_EMAIL,
                filePath: P12_PATH
            });
            await ProtractorHelper.openPage('clusters/ref/create');
        });

        it('should be done successfully', async () => {
            await ClusterCreateWizard.createCluster({
                    credentialName: credentialName,
                    clusterName: clusterName,
                    user: AMBARI_USER,
                    password: AMBARI_PASSWORD,
                    sshKeyString: SSH_KEY
                },
                { isAdvanced: false, isCloudStorageSupported: false });

            const isClusterCreated = await ClusterPage.isWidgetPresent(clusterName);

            await expect(isClusterCreated).toBeTruthy();
        });

        it('should be force terminate successfully', async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();

            const isClusterStatus = await ClusterPage.getWidgetStatus(clusterName, 'Terminating');

            await expect(isClusterStatus == 'Terminating' || isClusterStatus == 'Stale').toBe(true);
        });
    });
});
