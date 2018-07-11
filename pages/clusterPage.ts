import { BasePage } from "./basePage";
import { $ } from 'protractor';
import { PageHelpers } from '../helpers/pageHelpers';

export class ClusterPage extends BasePage {
    public static createButton = $('[data-qa="clusters-create"]');

    static getWidget(name: string) {
        const clusterWidget = $(`[data-qa="${name}"]`);

        return clusterWidget.isDisplayed();
    }

    static async openClusterDetails(name: string) {
        const clusterWidget = $(`[data-qa="${name}"]`);
        const clusterHref = await clusterWidget.getAttribute('href');
        const clusterID = await clusterHref.split('/')[4];

        console.log(`The cluster ID is [ ${clusterID} ]`);
        await PageHelpers.openPage(`clusters/${clusterID}/hardware`);
    }
}
