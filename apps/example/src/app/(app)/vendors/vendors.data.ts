export type Vendor = {
  id: number;
  name: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | (string & {});
  status: 'approved' | 'pending' | 'review' | (string & {});
  lastAssessment: string;
  logo: string;
};

const LOGO_DEV_TOKEN = 'pk_AZatYxV5QDSfWpRDaBxzRQ';

function logoDev(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}`;
}

export const vendors: Vendor[] = [
  {
    id: 1,
    name: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 15, 2023',
    logo: logoDev('aws.amazon.com'),
  },
  {
    id: 2,
    name: 'Google Cloud Platform',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 10, 2023',
    logo: logoDev('cloud.google.com'),
  },
  {
    id: 3,
    name: 'Slack',
    category: 'Communication',
    riskLevel: 'medium',
    status: 'approved',
    lastAssessment: 'Nov 28, 2023',
    logo: logoDev('slack.com'),
  },
  {
    id: 4,
    name: 'Salesforce',
    category: 'CRM',
    riskLevel: 'medium',
    status: 'pending',
    lastAssessment: 'Nov 15, 2023',
    logo: logoDev('salesforce.com'),
  },
  {
    id: 5,
    name: 'Datadog',
    category: 'Monitoring',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Oct 30, 2023',
    logo: logoDev('datadoghq.com'),
  },
  {
    id: 6,
    name: 'Stripe',
    category: 'Payments',
    riskLevel: 'high',
    status: 'review',
    lastAssessment: 'Oct 15, 2023',
    logo: logoDev('stripe.com'),
  },
];

export function getVendorById(id: number): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

