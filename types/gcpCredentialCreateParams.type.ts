export interface GCPCredentialCreateParams {
    keyType: string;
    name: string;
    projectId?: string;
    serviceAccountEmail?: string;
    filePath: string;
}
