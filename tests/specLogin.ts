import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { BASE_URL, PASSWORD_GUI, USERNAME_GUI } from '../environment/environment';
import { browser } from 'protractor';

describe('Cloudbreak Login examples', () => {

    it('should be successfully logged in', async () => {
        await browser.get(BASE_URL);

        expect(await BasePage.getPageTitle()).toContain('Hortonworks Cloudbreak');
    });

});

describe('where Cloudbreak Login for', () => {
    const actualURL = BasePage.getPageUrl();

    it('invalid user credentials should be failed', async () => {
        await LoginPage.login('mikka', 'makka');

        expect(await LoginPage.getError()).toContain('Login failed: Incorrect email/password or the account is disabled.');
    });

    it('valid user credentials should be successfull', async () => {
        await LoginPage.login(USERNAME_GUI, PASSWORD_GUI);

        expect(await actualURL).not.toContain('login');
    });
});
