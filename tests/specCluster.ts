import { AMBARI_PASSWORD, AMBARI_USER, SSH_KEY_NAME } from '../environment/environment';
import { BasePage } from '../pages/basePage';
import { ClusterPage } from '../pages/clusterPage';
import { ClusterCreateWizard } from '../pages/modules/clusterCreateWizard';
import { ClusterDetails } from '../pages/modules/clusterDetails';
import { browser } from 'protractor';

const basePage = new BasePage();
const clusterPage = new ClusterPage();
const wizard = new ClusterCreateWizard();
const details = new ClusterDetails();

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
            await basePage.openPage('clusters/ref/create');

            await wizard.createOpenStackCluster(credentialName, clusterName, user, password, sshKeyName);

            expect(await clusterPage.getWidget(clusterName)).toBeTruthy();
        });

        it('should be started successfully', async () => {
            expect(await clusterPage.waitForWidgetStatus(clusterName, 'in progress', true)).not.toContain('in progress');
            expect(await clusterPage.waitForWidgetStatus(clusterName, 'Running')).toContain('Running');
        }, 1800000 );

        it('should be terminated successfully', async () => {
            await clusterPage.openClusterDetails(clusterName);
            await details.forceTerminateCluster();

            expect(await clusterPage.waitForWidgetStatus(clusterName, 'Terminating')).toContain('Terminating');
            expect(await clusterPage.getWidget(clusterName)).toBeFalsy();
        }, 1800000 );
    });
});
