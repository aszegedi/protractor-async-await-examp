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
        const errorMessage = await this.errorMessage.getText();

        console.log(`Login error message is [ ${errorMessage} ]`);
        return await errorMessage;
    }
}