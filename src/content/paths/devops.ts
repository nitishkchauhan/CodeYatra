import { docs, gitStop, interviewStop, linuxStop, webStop } from './shared';
import type { CareerPath } from './types';

export const DEVOPS: CareerPath = {
  id: 'devops',
  title: 'DevOps / Cloud Engineer',
  tagline: 'Keep apps running, fast and automated in the cloud',
  job: 'Builds the pipelines that test and release code automatically, runs apps on cloud servers and containers, and gets woken up when something breaks.',
  months: '8–10 months',
  icon: 'M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z',
  color: '#0369A1',
  ink: '#075985',
  soft: '#E0F2FE',
  sections: [
    {
      title: 'Foundations',
      stops: [
        linuxStop,
        webStop,
        {
          id: 'scripting',
          title: 'Scripting with Python',
          why: 'Automate repeated tasks; DevOps engineers script all day.',
          modules: ['p-var-1', 'p-loop-1', 'p-fn-1', 'p-dict-1', 'p-err-1'],
        },
        gitStop,
      ],
    },
    {
      title: 'Containers and pipelines',
      stops: [
        {
          id: 'docker',
          title: 'Docker',
          why: 'Package an app with everything it needs so it runs the same everywhere.',
          links: [docs('Docker get started', 'https://docs.docker.com/get-started/')],
        },
        {
          id: 'cicd',
          title: 'CI/CD with GitHub Actions',
          why: 'Run tests and deploy automatically on every push.',
          links: [docs('GitHub Actions docs', 'https://docs.github.com/en/actions')],
        },
        { id: 'config', title: 'Config and secrets', why: 'Keep passwords and settings out of code with environment variables.', modules: ['n-env-1'] },
      ],
    },
    {
      title: 'Pick a cloud',
      stops: [
        {
          id: 'aws',
          title: 'AWS',
          why: 'The biggest cloud and the most asked-for in job posts.',
          choice: 'Cloud',
          links: [docs('Getting started with AWS', 'https://aws.amazon.com/getting-started/')],
        },
        {
          id: 'azure',
          title: 'Microsoft Azure',
          why: 'Common in large Indian IT services companies.',
          choice: 'Cloud',
          links: [docs('Azure training (Microsoft Learn)', 'https://learn.microsoft.com/en-us/training/azure/')],
        },
        {
          id: 'gcp',
          title: 'Google Cloud',
          why: 'Popular with startups and for data and AI work.',
          choice: 'Cloud',
          links: [docs('Google Cloud training', 'https://cloud.google.com/learn/training')],
        },
      ],
    },
    {
      title: 'Running at scale',
      stops: [
        {
          id: 'kubernetes',
          title: 'Kubernetes',
          why: 'Run many containers across many servers, with automatic restarts and scaling.',
          links: [docs('Kubernetes basics tutorial', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/')],
        },
        {
          id: 'terraform',
          title: 'Infrastructure as code',
          why: 'Create servers and networks from code files instead of clicking in a console.',
          optional: true,
          links: [docs('Terraform tutorials', 'https://developer.hashicorp.com/terraform/tutorials')],
        },
        {
          id: 'monitoring',
          title: 'Monitoring and alerts',
          why: 'Know an app is slow or down before users complain.',
          optional: true,
          links: [docs('Prometheus overview', 'https://prometheus.io/docs/introduction/overview/')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'project',
          title: 'Project: a deployed app with a pipeline',
          why: 'Containerise a small app, deploy it to the cloud, and make every push test and release it automatically.',
          project: true,
          links: [docs('GitHub Actions quickstart', 'https://docs.github.com/en/actions/writing-workflows/quickstart')],
        },
        interviewStop('Explain your pipeline, Linux and networking questions, and how you would debug a server that is down.'),
      ],
    },
  ],
};
