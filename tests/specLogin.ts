import { LoginPage } from '../pages/loginPage';
import { BASE_URL, CLOUDBREAK_PASSWORD, CLOUDBREAK_USERNAME } from '../environment/environment';
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
            await LoginPage.login(CLOUDBREAK_USERNAME, CLOUDBREAK_PASSWORD);

            expect(await actualURL).not.toContain('login');
        });
    });
});
