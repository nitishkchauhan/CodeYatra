import { course, docs, linuxStop, practice, video, webStop } from './shared';
import type { CareerPath } from './types';

export const SECURITY: CareerPath = {
  id: 'security',
  title: 'Cybersecurity (Beginner)',
  tagline: 'Protect apps and networks from attackers',
  job: 'Finds weaknesses before attackers do: tests websites and networks, watches for suspicious activity and helps teams fix security holes. Always with permission.',
  months: '9–12 months',
  icon: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z M9 12l2 2 4-4',
  color: '#B91C1C',
  ink: '#991B1B',
  soft: '#FDECEC',
  sections: [
    {
      title: 'Foundations',
      stops: [
        webStop,
        {
          id: 'networking',
          title: 'Networking basics',
          why: 'IP addresses, ports, TCP/UDP, DNS and HTTP: you can’t secure what you don’t understand.',
          links: [docs('Cloudflare Learning Center', 'https://www.cloudflare.com/learning/')],
        },
        linuxStop,
        {
          id: 'python',
          title: 'Python for scripting',
          why: 'Write small tools to automate scans and parse logs.',
          modules: ['p-var-1', 'p-str-1', 'p-loop-1', 'p-fn-1', 'p-err-1'],
        },
      ],
    },
    {
      title: 'Web security',
      stops: [
        {
          id: 'web-basics',
          title: 'How websites are built',
          why: 'HTML forms and JavaScript are where most web attacks happen.',
          modules: ['w-html-1', 'h-form-1', 'j-var-1', 'j-dom-1'],
        },
        { id: 'sql', title: 'SQL', why: 'Understanding queries is the key to understanding SQL injection.', modules: ['sql-select', 'sql-where', 'sql-join'] },
        {
          id: 'owasp',
          title: 'OWASP Top 10',
          why: 'The ten most common web vulnerabilities and how to prevent them.',
          links: [docs('OWASP Top 10', 'https://owasp.org/www-project-top-ten/')],
        },
        {
          id: 'web-academy',
          title: 'Hands-on web hacking labs',
          why: 'Practise real attacks safely on purpose-built labs.',
          links: [practice('PortSwigger Web Security Academy', 'https://portswigger.net/web-security', 'Free')],
        },
      ],
    },
    {
      title: 'Practise legally',
      stops: [
        {
          id: 'tryhackme',
          title: 'Guided rooms',
          why: 'Beginner-friendly virtual labs that teach one skill at a time.',
          links: [practice('TryHackMe', 'https://tryhackme.com/')],
        },
        {
          id: 'ctf',
          title: 'Capture the flag (CTF)',
          why: 'Security puzzles and competitions, great for learning and for your resume.',
          links: [practice('picoCTF', 'https://picoctf.org/', 'Free')],
        },
        {
          id: 'ethics',
          title: 'Ethics and the law',
          why: 'Only test systems you own or have written permission for. In India, unauthorised access is a crime under the IT Act.',
          links: [course('Hacker101 (HackerOne)', 'https://www.hacker101.com/', 'Free')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'cert',
          title: 'An entry-level certificate',
          why: 'Many security jobs filter by certificates such as CompTIA Security+ or ISC2 CC.',
          optional: true,
          links: [docs('ISC2 Certified in Cybersecurity', 'https://www.isc2.org/certifications/cc')],
        },
        {
          id: 'writeups',
          title: 'Project: publish write-ups',
          why: 'Write up the labs and CTFs you solve on a blog or GitHub; it shows how you think.',
          project: true,
          links: [practice('TryHackMe', 'https://tryhackme.com/')],
        },
        {
          id: 'interviews',
          title: 'Interview preparation',
          why: 'Networking, OWASP and Linux questions, and walking through how you solved a lab.',
          links: [video('NetworkChuck', 'https://www.youtube.com/@NetworkChuck')],
        },
      ],
    },
  ],
};
