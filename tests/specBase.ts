import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { PASSWORD_GUI, USERNAME_GUI } from '../environment/environment';
import { PageHelpers } from '../helpers/pageHelpers';

describe('Cloudbreak Base examples', () => {
    const actualURL = PageHelpers.getPageUrl();

    beforeAll(async () => {
       await PageHelpers.closeConfirmation();
    });

    afterAll(async () => {
        await LoginPage.login(USERNAME_GUI, PASSWORD_GUI);
    });

    it('Clusters menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-clusters')).toBeTruthy();
    });

    it('Credentials menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-credentials')).toBeTruthy();
    });

    it('Blueprints menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-blueprints')).toBeTruthy();
    });

    it('Cluster Extensions menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-cluster-extensions')).toBeTruthy();
    });

    it('Recipes sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-cluster-extensions',true,'submenu-recipes')).toBeTruthy();
    });

    it('Management Packs sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-cluster-extensions',true,'submenu-mpacks')).toBeTruthy();
    });

    it('External Sources menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-external-sources')).toBeTruthy();
    });

    it('Authentication Configurations sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-external-sources', true,'submenu-authentication-config')).toBeTruthy();
    });

    it('Database Configurations sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-external-sources', true,'submenu-database-config')).toBeTruthy();
    });

    it('Image Catalogs sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-external-sources', true,'submenu-imagecatalogs')).toBeTruthy();
    });

    it('Proxy Configurations sub-menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-external-sources', true,'submenu-proxy-config')).toBeTruthy();
    });

    it('History menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-history')).toBeTruthy();
    });

    it('Settings menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-settings')).toBeTruthy();
    });

    it('Download CLI menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-downloadcli')).toBeTruthy();
    });

    it('Documentation menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-documentation')).toBeTruthy();
    });

    it('Get Help menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-gethelp')).toBeTruthy();
    });

    it('Logout menu item should be available', async () => {
        expect(await BasePage.isMenuItemPresent('menu-logout')).toBeTruthy();
    });

    it('should be able to log out from', async () => {
        await BasePage.logOut();

        expect(await actualURL).not.toContain('clusters');
    });
});
