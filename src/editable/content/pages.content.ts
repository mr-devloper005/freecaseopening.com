import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Free classified ads, listings, and local discovery',
      description: 'Explore fresh ads, business listings, visual posts, and practical local updates in one clean browsing experience.',
      openGraphTitle: 'Free classified ads, listings, and local discovery',
      openGraphDescription: 'Browse local ads, business listings, and useful posts through a brighter classified magazine layout.',
      keywords: ['classified ads', 'business listings', 'local discovery', 'free ads'],
    },
    hero: {
      badge: 'Fresh local marketplace',
      title: ['Free classified ads,', 'trusted listings, and local discovery.'],
      description:
        'Search businesses, services, offers, and useful posts with a cleaner classified layout built for quick browsing on desktop and mobile.',
      primaryCta: { label: 'Read Latest Posts', href: '/article' },
      secondaryCta: { label: 'Explore Profiles', href: '/profile' },
      searchPlaceholder: 'Search by keyword, service, product, or location',
      focusLabel: 'Focus',
      featureCardBadge: 'featured spotlight',
      featureCardTitle: 'Local ads and trusted business posts lead the homepage.',
      featureCardDescription: 'Recent images, offers, and service highlights stay front and center without changing any existing data flow.',
    },
    intro: {
      badge: 'Why people browse here',
      title: 'Quick search, easy comparison, and clean local discovery.',
      paragraphs: [
        'The layout keeps active posts easy to scan with stronger search, clearer cards, and more useful category browsing.',
        'Visitors can move between ads, business listings, images, profiles, and articles without losing their place.',
        'Every section is designed to help people compare options faster and reach the right detail page with less clutter.',
      ],
      sideBadge: 'Highlights',
      sidePoints: [
        'Search-first homepage with stronger category navigation.',
        'Multiple card styles for featured, recent, and editorial sections.',
        'Cleaner listing and detail pages with better contact actions.',
        'Responsive spacing built to feel polished on smaller screens.',
      ],
      primaryLink: { label: 'Browse profiles', href: '/profile' },
      secondaryLink: { label: 'Read recent posts', href: '/article' },
    },
    cta: {
      badge: 'Share your listing',
      title: 'Post your update, business, or offer in a layout built for visibility.',
      description:
        'Add a new listing, publish a post, or share a service update through the same connected publishing flow already supported by the site.',
      primaryCta: { label: 'Post Your Ad', href: '/create' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the site',
    title: 'A cleaner way to browse local posts, listings, and useful updates.',
    description: `${slot4BrandConfig.siteName} brings business listings, classified posts, visual updates, and useful resources into one connected experience.`,
    paragraphs: [
      'Instead of making visitors jump through disconnected layouts, the site keeps active sections close together with consistent browsing patterns.',
      'Whether someone starts with a business listing, a classified ad, an article, or an image post, they can keep exploring related pages without friction.',
    ],
    values: [
      {
        title: 'Fast discovery',
        description: 'We focus on search, category browsing, and strong visual hierarchy so people can find relevant posts quickly.',
      },
      {
        title: 'Useful structure',
        description: 'Listings, resources, and supporting posts are organized to make comparison and follow-up easier.',
      },
      {
        title: 'Clear presentation',
        description: 'Clean cards, readable detail pages, and mobile-friendly spacing keep the site practical and approachable.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach out with a listing question, publishing request, or general inquiry.',
    description: 'Use the contact page for support, submission help, partnership questions, or anything else related to the site.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search ads, listings, categories, and useful posts across the site.',
    },
    hero: {
      badge: 'Search the site',
      title: 'Find ads, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, service, location, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create a new post.',
      description: 'Use your account to open the publishing workspace and submit content for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create posts for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
