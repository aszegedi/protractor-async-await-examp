import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { PASSWORD_GUI, USERNAME_GUI } from '../environment/environment';
import { PageHelpers } from '../helpers/pageHelpers';

const testDataProvider = require('../data/navigation.json');

describe('Cloudbreak Base examples', () => {
    const actualURL = PageHelpers.getPageUrl();

    beforeAll(async () => {
       await PageHelpers.closeConfirmation();
    });

    afterAll(async () => {
        await LoginPage.login(USERNAME_GUI, PASSWORD_GUI);
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
