export type Vendor = {
  id: number;
  name: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | (string & {});
  status: 'approved' | 'pending' | 'review' | (string & {});
  lastAssessment: string;
  logo: string;
};

export const vendors: Vendor[] = [
  {
    id: 1,
    name: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 15, 2023',
    logo: 'https://logo.clearbit.com/aws.amazon.com',
  },
  {
    id: 2,
    name: 'Google Cloud Platform',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 10, 2023',
    logo: 'https://logo.clearbit.com/cloud.google.com',
  },
  {
    id: 3,
    name: 'Slack',
    category: 'Communication',
    riskLevel: 'medium',
    status: 'approved',
    lastAssessment: 'Nov 28, 2023',
    logo: 'https://logo.clearbit.com/slack.com',
  },
  {
    id: 4,
    name: 'Salesforce',
    category: 'CRM',
    riskLevel: 'medium',
    status: 'pending',
    lastAssessment: 'Nov 15, 2023',
    logo: 'https://logo.clearbit.com/salesforce.com',
  },
  {
    id: 5,
    name: 'Datadog',
    category: 'Monitoring',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Oct 30, 2023',
    logo: 'https://logo.clearbit.com/datadoghq.com',
  },
  {
    id: 6,
    name: 'Stripe',
    category: 'Payments',
    riskLevel: 'high',
    status: 'review',
    lastAssessment: 'Oct 15, 2023',
    logo: 'https://logo.clearbit.com/stripe.com',
  },
];

export function getVendorById(id: number): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

