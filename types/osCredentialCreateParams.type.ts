export interface OSCredentialCreateParams {
    keystoneVersion: string;
    name: string;
    user: string;
    password: string;
    tenantName?: string;
    endpoint: string;
    apiFacing: string;
    keystoneScope?: string;
    userDomain?: string;
    domainName?: string;
    projectName?: string;
}
