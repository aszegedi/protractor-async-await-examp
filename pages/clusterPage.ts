import { BasePage } from "./basePage";
import { $, browser, protractor } from 'protractor';
import { ProtractorHelper } from '../helpers/protractor.helper';

export class ClusterPage extends BasePage {
    public static createButton = $('[data-qa="clusters-create"]');

    static async isWidgetPresent(name: string) {
        return await $(`[data-qa="${name}"]`).isPresent();
    }

    static async getWidgetStatus(name: string, desiredStatus: string) {
        const EC = protractor.ExpectedConditions;
        const clusterWidget = $(`[data-qa="${name}"]`);

        try {
            await browser.wait(EC.textToBePresentInElement(clusterWidget, desiredStatus), 5000, `${desiredStatus} status is not present`);
            return await clusterWidget.$('[data-qa="stack-status"]').getText();
        } catch (e) {
            return 'Stale';
        }
    }

    static async openClusterDetails(name: string) {
        const clusterWidget = $(`[data-qa="${name}"]`);
        const clusterHref = await clusterWidget.getAttribute('href');
        const clusterID = clusterHref.split('/')[4];

        console.log(`The cluster ID is [ ${clusterID} ]`);
        await ProtractorHelper.openPage(`clusters/${clusterID}/hardware`);
    }
}
