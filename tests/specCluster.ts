import { AMBARI_PASSWORD, AMBARI_USER, SSH_KEY_NAME } from '../environment/environment';
import { BasePage } from '../pages/basePage';
import { ClusterPage } from '../pages/clusterPage';
import { ClusterCreateWizard } from '../pages/modules/clusterCreateWizard';
import { ClusterDetails } from '../pages/modules/clusterDetails';
import { browser } from 'protractor';

const credentialName = 'autotesting-clusters-os';
const clusterName = 'protractor-os-cluster';
const user = AMBARI_USER;
const password = AMBARI_PASSWORD;
const sshKeyName = SSH_KEY_NAME;

const originalJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const originalScriptTimeout = browser.allScriptsTimeout;

describe('Cloudbreak Cluster examples', () => {

    describe('where create new cluster with Advanced Template', () => {

        beforeAll(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000000;
            browser.allScriptsTimeout = 2000000;
        });

        afterAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
            browser.allScriptsTimeout = originalScriptTimeout;
        });

        it('should be done successfully', async () => {
            await BasePage.openPage('clusters/ref/create');

            await ClusterCreateWizard.createOpenStackCluster(credentialName, clusterName, user, password, sshKeyName);

            expect(await ClusterPage.getWidget(clusterName)).toBeTruthy();
        });

        it('should be started successfully', async () => {
            expect(await ClusterPage.waitForWidgetStatus(clusterName, 'in progress', true)).toBeTruthy();
        }, 1800000 );

        it('should be in "Running" state', async () => {
            expect(await ClusterPage.waitForWidgetStatus(clusterName, 'Running')).toBeTruthy();
        });

        it('should be terminated successfully', async () => {
            await ClusterPage.openClusterDetails(clusterName);
            await ClusterDetails.forceTerminateCluster();

            expect(await ClusterPage.waitForWidgetStatus(clusterName, 'Terminating')).toBeTruthy();
        });

        it('should be removed successfully', async () => {
            expect(await ClusterPage.getWidget(clusterName, true)).toBeTruthy();
        }, 1800000 );
    });
});
