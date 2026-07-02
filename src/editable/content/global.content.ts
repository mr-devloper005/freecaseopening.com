import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Local discovery made easier',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Local discovery made easier',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Post Your Ad', href: '/create' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Find trusted ads, listings, and practical local updates.',
    description:
      'Browse fresh posts, business listings, useful resources, and neighborhood-ready offers through one clean classified magazine layout.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Guides & Posts', href: '/article' },
          { label: 'Profiles', href: '/profile' },
          { label: 'Images', href: '/image' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Login', href: '/login' },
          { label: 'Create Account', href: '/signup' },
        ],
      },
    ],
    bottomNote: 'Built for straightforward browsing, discovery, and contact.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
