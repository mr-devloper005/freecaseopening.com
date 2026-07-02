import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Editorial desk',
    headline: 'Fresh articles, guides, and useful local reads.',
    description: 'Browse readable post collections with stronger headlines, cleaner cards, and a brighter magazine-inspired layout.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Keep the archive easy to scan without losing depth.',
    chips: ['Featured reads', 'Useful guides', 'Clean layout'],
  },
  classified: {
    eyebrow: 'Classified board',
    headline: 'Latest ads, offers, and fast-moving updates.',
    description: 'This layout is designed for quick comparison, strong pricing moments, and simple follow-through into detail pages.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Short summaries and clear action cues matter most here.',
    chips: ['Fresh ads', 'Fast scan', 'Practical details'],
  },
  sbm: {
    eyebrow: 'Curated links',
    headline: 'Useful resources arranged in a brighter discovery grid.',
    description: 'Bookmark-style posts should feel approachable, practical, and easy to revisit.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Helpful references deserve clean cards and clear titles.',
    chips: ['Useful links', 'Resource picks', 'Simple browsing'],
  },
  profile: {
    eyebrow: 'People and brands',
    headline: 'Profiles with cleaner identity blocks and trust cues.',
    description: 'Show people, businesses, and organizations through cards that make names, roles, and quick contact paths more visible.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Lead with clarity before secondary metadata.',
    chips: ['Identity first', 'Trust cues', 'Easy contact'],
  },
  pdf: {
    eyebrow: 'Document shelf',
    headline: 'Documents and files displayed like a useful reference library.',
    description: 'PDF posts should feel practical and accessible, with clearer download actions and calmer file presentation.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Make file access obvious and frustration-free.',
    chips: ['Reference files', 'Downloads', 'Archive flow'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Business listings built for search, comparison, and discovery.',
    description: 'Directory pages should make it easy to review locations, summaries, and contact options without visual clutter.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Comparison-friendly cards improve decision speed.',
    chips: ['Businesses', 'Locations', 'Contact-ready'],
  },
  image: {
    eyebrow: 'Visual showcase',
    headline: 'Image-led posts with stronger visual rhythm.',
    description: 'Gallery browsing should stay bold, readable, and easy to explore on every screen size.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the imagery do the heavy lifting.',
    chips: ['Visual-first', 'Gallery flow', 'Stronger cards'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
