export interface AzureCredentialCreateParams {
    credentialType: string;
    name: string;
    subscriptionId: string;
    tenantId: string;
    appId: string;
    appPassword: string;
}
