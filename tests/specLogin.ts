import { LoginPage } from '../pages/loginPage';
import { BASE_URL, PASSWORD_GUI, USERNAME_GUI } from '../environment/environment';
import { browser } from 'protractor';
import { PageHelpers } from '../helpers/pageHelpers';

describe('Cloudbreak Login examples', () => {

    describe('where Cloudbreak Login page Title', () => {
        it('should be "Hortonworks Cloudbreak"', async () => {
            await browser.get(BASE_URL);

            expect(await PageHelpers.getPageTitle()).toContain('Hortonworks Cloudbreak');
        });
    });

    describe('where Cloudbreak Login for', () => {
        const actualURL = PageHelpers.getPageUrl();

        it('invalid user credentials should be failed', async () => {
            await LoginPage.login('mikka', 'makka');

            expect(await LoginPage.getError()).toContain('Login failed: Incorrect email/password or the account is disabled.');
        });

        it('valid user credentials should be successfull', async () => {
            await LoginPage.login(USERNAME_GUI, PASSWORD_GUI);

            expect(await actualURL).not.toContain('login');
        });
    });
});
