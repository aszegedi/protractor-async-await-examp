export interface ClusterCreateParams {
    credentialName: string;
    clusterName: string;
    user: string;
    password: string;
    sshKeyName?: string;
    sshKeyString?: string;
    network?: string;
    subnet?: string;
    securityGroupMaster?: string;
    securityGroupWorker?: string;
    securityGroupCompute?: string;
    blueprintName?: string;
}
