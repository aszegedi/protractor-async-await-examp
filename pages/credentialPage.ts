import { BasePage } from "./basePage";
import { $ } from 'protractor';

export class CredentialPage extends BasePage {
    public static createButton = $('[data-qa="credentials-create"]');
    public static refreshButton = $('[data-qa="credential-count"] i');
}