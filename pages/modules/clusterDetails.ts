import { $, browser, protractor } from 'protractor';

export class ClusterDetails {
    public static terminateButton = $('[data-qa="clusterdetails-terminate"]');

    static async forceTerminateCluster() {
        const EC = protractor.ExpectedConditions;
        const confirmationYesButton = $('[data-qa="clusterterminate-yes"]');
        const forceTermination = $('[data-qa="clusterterminate-force"]');
        const forceTerminationLabel = forceTermination.$('label');

        await this.terminateButton.click();
        await forceTerminationLabel.click();
        await browser.wait(EC.visibilityOf($('[class*="checkbox-checked"]')), 5000, 'Force Terminate has not been selected');
        await confirmationYesButton.click();

        await browser.wait(EC.invisibilityOf(confirmationYesButton), 5000, 'Terminate confirmation has not been closed');
    }
}