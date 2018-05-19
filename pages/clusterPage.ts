import { BasePage } from "./basePage";
import { $, browser, by, protractor } from 'protractor';

export class ClusterPage extends BasePage {
    public createButton = $('#btnCreateCluster');

    async waitForWidgetStatus(clusterName: string, state: string, staleness = false) {
        const EC = protractor.ExpectedConditions;
        let desiredStatus = $('a[data-stack-name="' + clusterName + '"]').element(by.cssContainingText('[data-qa="stack-status"]', state));

        if(staleness) {
            return await browser.wait(EC.stalenessOf(desiredStatus), 1800000, clusterName + ' is not in the desired state ' + state);
        } else {
            return await browser.wait(EC.presenceOf(desiredStatus), 1800000, clusterName + ' is not in the desired state ' + state);
        }
    }

    async getWidget(clusterName: string) {
        return await $('a[data-stack-name="' + clusterName + '"]').isDisplayed().then((displayed) => {
            return displayed;
        }, error => {
            return false;
        });
    }

    async openClusterDetails(clusterName: string) {
        const widgetLink = $('a[data-stack-name="' + clusterName + '"]');

        await widgetLink.click();
    }
}
