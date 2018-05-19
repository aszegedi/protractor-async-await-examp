import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { BASE_URL } from '../environment/environment';
import { browser } from 'protractor';

const loginPage = new LoginPage();
const basePage = new BasePage();

describe('Cloudbreak Login examples', () => {

    it('should be successfully logged in', async () => {
        await browser.get(BASE_URL);

        expect(await basePage.getPageTitle()).toContain('Hortonworks Cloudbreak');
    });

});

describe('where Cloudbreak Login for', () => {
    const actualURL = basePage.getPageUrl();

    it('invalid user credentials should be failed', async () => {
        await loginPage.invalidLogin();

        expect(await loginPage.getErrorMessage()).toContain('Login failed: Incorrect email/password or the account is disabled.');
    });

    it('valid user credentials should be successfull', async () => {
        await loginPage.login();

        expect(await actualURL).not.toContain('login');
    });
});
