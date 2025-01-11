import { getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: '/#' },
    { text: 'Projects', href: '/projects' },
    { text: 'Tools', links: [
      { text: 'My Certificates', href: '/certificates' },
      { text: 'My Vinyl Records', href: '/records' },
    ] },
    { text: 'Contact', href: '/contact' }
  ]
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: './r/x.html' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: './r/linkedin.html' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: './r/github.html' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
};
