import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { CLOUDBREAK_PASSWORD, CLOUDBREAK_USERNAME } from '../environment/environment';
import { PageHelpers } from '../helpers/pageHelpers';

const testDataProvider = require('../data/navigation.json');

describe('Cloudbreak Base examples', () => {
    const actualURL = PageHelpers.getPageUrl();

    beforeAll(async () => {
       await PageHelpers.closeConfirmation();
    });

    afterAll(async () => {
        await LoginPage.login(CLOUDBREAK_USERNAME, CLOUDBREAK_PASSWORD);
    });

    testDataProvider.forEach((data) => {
        it(`${data.name} menu item should be available`, async () => {
            expect(await BasePage.isMenuItemPresent(data.class, data.submenu, data.subclass)).toBeTruthy();
        });
    });

    it('should be able to log out from', async () => {
        await BasePage.logOut();

        expect(await actualURL).not.toContain('clusters');
    });
});
