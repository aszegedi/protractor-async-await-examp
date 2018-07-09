import { $ } from "protractor";

export class LoginPage {
    public static userNameInput = $('[data-qa="login-username"]');
    public static passwordInput = $('[data-qa="login-password"]');
    public static loginButton = $('[data-qa="login-submit"]');
    public static errorMessage = $('[data-qa="login-error"]');

    static async login(user:string, password: string) {
        await this.userNameInput.sendKeys(user);
        await this.passwordInput.sendKeys(password);
        await this.loginButton.click();
    }

    static async getError() {
        return await this.errorMessage.getText().then(text => {
            console.log(`Login Error: ${text}`);
            return text;
        });
    }
}