import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { CLOUDBREAK_PASSWORD, CLOUDBREAK_USERNAME } from '../environment/environment';
import { ProtractorHelper } from '../helpers/protractor.helper';

const testDataProvider = require('../data/navigation.json');

describe('Cloudbreak Base examples', () => {
    beforeAll(async () => {
       await ProtractorHelper.closeConfirmation();
    });

    afterAll(async () => {
        await LoginPage.login(CLOUDBREAK_USERNAME, CLOUDBREAK_PASSWORD);
    });

    testDataProvider.forEach((data) => {
        it(`${data.name} menu item should be available`, async () => {
            const isMenuPresent = await BasePage.isMenuItemPresent(data.class, data.submenu, data.subclass);

            await expect(isMenuPresent).toBeTruthy();
        });
    });

    it('should be able to log out from', async () => {
        await BasePage.logOut();
        const actualURL = await ProtractorHelper.getPageUrl();

        await expect(actualURL).not.toContain('clusters');
    });
});
