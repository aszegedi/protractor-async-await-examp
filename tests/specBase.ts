import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { async } from 'q';

const basePage = new BasePage();
const loginPage = new LoginPage();

describe('Cloudbreak Base examples', () => {
    const actualURL = basePage.getPageUrl();

    afterAll(async () => {
        await loginPage.login();
    });

    it('Clusters menu item should be available', async () => {
        expect(await basePage.isMenuItemPresent('menu-clusters')).toBeTruthy();
    });

    it('should be able to log out from', async () => {
        await basePage.logOut();

        expect(await actualURL).not.toContain('clusters');
    });
});
