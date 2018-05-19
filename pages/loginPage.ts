import { $ } from "protractor";
import { PASSWORD_GUI, USERNAME_GUI } from '../environment/environment';

export class LoginPage {
    public loginForm = $('div.login-wrapper form');
    public userNameInput = this.loginForm.$('#username');
    public passwordInput = this.loginForm.$('#password');
    public loginButton = this.loginForm.$('#loginBtn');
    public errorMessage = $('div.error');

    async login() {
        const userName = USERNAME_GUI;
        const password = PASSWORD_GUI;

        await this.userNameInput.sendKeys(userName);
        await this.passwordInput.sendKeys(password);
        await this.loginButton.click();
    }

    async invalidLogin () {
        await this.userNameInput.sendKeys('valami');
        await this.passwordInput.sendKeys(' ');
        await this.loginButton.click();
    }

    getErrorMessage() {
        return this.errorMessage.getText().then((text) => {
            return text;
        });
    }
}