import { $ } from 'protractor';

export class ClusterDetails {
    public static terminateButton = $('[data-qa="clusterdetails-terminate"]');

    static async forceTerminateCluster() {
        const confirmationYesButton = $('[data-qa="clusterterminate-yes"]');
        const forceTermination = $('[data-qa="clusterterminate-force"]');
        const forceTerminationLabel = forceTermination.$('label');

        await this.terminateButton.click();
        await forceTerminationLabel.click();
        await confirmationYesButton.click();
    }
}