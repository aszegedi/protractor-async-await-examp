import { $$, browser, by, element, ElementFinder, protractor } from 'protractor';

export class PageUtils {
    selectedElementIsPresent(selectedElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;

        return browser.wait(EC.presenceOf(selectedElement), 5000, 'Element is NOT visisble!').then(
            () => {
                return selectedElement.isPresent().then(
                    presented => {
                        return presented;
                    },
                    error => {
                        return false;
                    }
                );
            },
            error => {
                return false;
            }
        );
    }

    selectedElementIsVisible(selectedElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;

        return browser.wait(EC.visibilityOf(selectedElement), 5000, 'Element is NOT visisble!').then(
            () => {
                return selectedElement.isDisplayed().then(
                    displayed => {
                        return displayed;
                    },
                    error => {
                        return false;
                    }
                );
            },
            error => {
                return false;
            }
        );
    }

    selectedElementIsClickable(selectedElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;

        return browser.wait(EC.elementToBeClickable(selectedElement), 5000, 'Element is NOT visisble!').then(
            () => {
                return selectedElement.isPresent().then(
                    enabled => {
                        return enabled;
                    },
                    error => {
                        return false;
                    }
                );
            },
            error => {
                return false;
            }
        );
    }

    clickOnNext(firstNextURL: string, secondNextURL = '/create/file-system') {
        const EC = protractor.ExpectedConditions;
        const nextButton = element(by.cssContainingText('button', 'Next'));
        const firstPageCondition = EC.urlContains(firstNextURL);
        const secondPageCondition = EC.urlContains(secondNextURL);

        return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
            return nextButton.click().then(() => {
                return browser
                    .wait(EC.or(firstPageCondition, secondPageCondition), 5000, 'Next page is NOT visible')
                    .then(() => {
                        browser.getCurrentUrl().then(url => {
                            return console.log(url);
                        });
                        return true;
                    });
            });
        });
    }

    async selectFromList(type: string, selectorElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;
        const selectedType = selectorElement.element(by.cssContainingText('.mat-select-value span', type));

        await browser.wait(EC.presenceOf(selectedType), 2000, type + ' is NOT selected already.').then(
            () => {
                return console.log(type + ' has already been selected.');
            },
            error => {
                return browser
                    .wait(EC.elementToBeClickable(selectorElement), 5000, 'Selector is NOT clickable')
                    .then(() => {
                        return selectorElement.click().then(() => {
                            return element(by.cssContainingText('mat-option', type))
                                .click()
                                .then(
                                    () => {
                                        return true;
                                    },
                                    error => {
                                        console.log(type + ' is not present!');
                                        return $$('mat-option')
                                            .first()
                                            .click();
                                    }
                                );
                        });
                    });
            }
        );
    }
}
