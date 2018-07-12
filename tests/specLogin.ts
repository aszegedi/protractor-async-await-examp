import { LoginPage } from '../pages/loginPage';
import { BASE_URL, CLOUDBREAK_PASSWORD, CLOUDBREAK_USERNAME } from '../environment/environment';
import { ProtractorHelper } from '../helpers/protractor.helper';
import { browser } from 'protractor';

describe('Cloudbreak Login examples', () => {

    describe('where Cloudbreak Login page Title', () => {
        it('should be "Hortonworks Cloudbreak"', async () => {
            await browser.get(BASE_URL);
            const title = await ProtractorHelper.getPageTitle();

            await expect(title).toContain('Hortonworks Cloudbreak');
        });
    });

    describe('where Cloudbreak Login for', () => {
        it('invalid user credentials should be failed', async () => {
            await LoginPage.login('mikka', 'makka');
            const errorMessage = await LoginPage.getError();

            await expect(errorMessage).toContain('Login failed: Incorrect email/password or the account is disabled.');
        });

        it('valid user credentials should be successfull', async () => {
            await LoginPage.login(CLOUDBREAK_USERNAME, CLOUDBREAK_PASSWORD);
            const actualURL = await ProtractorHelper.getPageUrl();

            await expect(actualURL).not.toContain('login');
        });
    });
});
