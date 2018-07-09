import { BasePage } from "./basePage";
import { $, browser, by, protractor } from 'protractor';

export class ClusterPage extends BasePage {
    public static createButton = $('#btnCreateCluster');

    static async waitForWidgetStatus(clusterName: string, state: string, staleness = false) {
        const EC = protractor.ExpectedConditions;
        const desiredStatus = $('a[data-stack-name="' + clusterName + '"]').element(by.cssContainingText('[data-qa="stack-status"]', state));

        if(staleness) {
            return await browser.wait(EC.stalenessOf(desiredStatus), 1800000, clusterName + ' state has not been changed from ' + state);
        } else {
            return await browser.wait(EC.presenceOf(desiredStatus), 1800000, clusterName + ' is not in the desired state ' + state);
        }
    }

    static async getWidget(clusterName: string, staleness = false) {
        const EC = protractor.ExpectedConditions;
        const clusterWidget = $('a[data-stack-name="' + clusterName + '"]');

        if(staleness) {
            return await browser.wait(EC.stalenessOf(clusterWidget), 1800000, clusterName + ' has not been terminated!');
        } else {
            return await browser.wait(EC.presenceOf(clusterWidget), 1800000, clusterName + ' has not been created!');
        }
    }

    static async openClusterDetails(clusterName: string) {
        const widgetLink = $('a[data-stack-name="' + clusterName + '"]');

        await widgetLink.click();
    }
}
