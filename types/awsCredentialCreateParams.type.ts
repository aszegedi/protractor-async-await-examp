export interface AWSCredentialCreateParams {
    credentialType: string;
    name: string;
    roleArn?: string;
    accessKey?: string;
    secretKey?: string;
}
