/// <reference types="node" />

export const BASE_URL = process.env.BASE_URL || 'https://192.168.99.100';
export const CLOUDBREAK_USERNAME = process.env.CLOUDBREAK_USERNAME || 'admin@example.com';
export const CLOUDBREAK_PASSWORD = process.env.CLOUDBREAK_PASSWORD || 'cloudbreak';

export const OS_USERNAME = process.env.OS_USERNAME || 'cloudbreak';
export const OS_PASSWORD = process.env.OS_PASSWORD || 'cloudbreak';
export const OS_TENANT_NAME = process.env.OS_TENANT_NAME || 'cloudbreak';
export const OS_AUTH_URL = process.env.OS_AUTH_URL || 'http://openstack.hortonworks.com:1000/v2.0';
export const OS_APIFACING = process.env.OS_APIFACING || 'internal';
export const OS_KEYSTONE = process.env.OS_KEYSTONE || 'v2';

export const AWS_ROLE_ARN = process.env.AWS_ROLE_ARN || 'arn:aws:iam::1234567890:role/auto.testing';

export const ARM_SUBSCRIPTION_ID = process.env.ARM_SUBSCRIPTION_ID || 'a123456b-123c-12d3-ef12-12g3h456i789';
export const ARM_TENANT_ID = process.env.ARM_TENANT_ID || 'a12b1234-1234-12bc-1def-1g2h3i45678j';
export const ARM_APP_ID = process.env.ARM_APP_ID || '1a2bcd34-1234-1efg-1234-1234h5ijkl67';
export const ARM_PASSWORD = process.env.ARM_PASSWORD || 'password123';

export const GCP_PROJECT = process.env.GCP_PROJECT || 'auto-testing';
export const GCP_ACCOUNT_EMAIL = process.env.GCP_ACCOUNT_EMAIL || 'auto-testing@auto-testing.iam.gserviceaccount.com';
export const P12_PATH = process.env.P12_PATH || '../../auto-testing-1a2bc3456789.p12';

export const AMBARI_USER = process.env.AMBARI_USER || 'admin';
export const AMBARI_PASSWORD = process.env.AMBARI_PASSWORD || 'admin123!@#';

export const SSH_KEY_NAME = process.env.SSH_KEY_NAME || 'demotest';
export const SSH_KEY = process.env.SSH_KEY || 'ssh-rsa AAAAB3';

export const CLUSTER_NAME = process.env.CLUSTER_NAME || 'autotesting';
export const CREDENTIAL_NAME = process.env.CREDENTIAL_NAME || 'autotesting';

export const CHROME_BIN = process.env.CHROME_BIN || '/usr/bin/google-chrome';
export const CHROME_DRIVER_BIN = process.env.CHROME_DRIVER_BIN || '../chromedriver';