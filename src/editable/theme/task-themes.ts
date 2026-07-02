import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const GEOMETRIC = "'Sora', 'Plus Jakarta Sans', system-ui, sans-serif"
const BODY = "'Plus Jakarta Sans', system-ui, sans-serif"

const base = {
  dark: false,
  fontDisplay: GEOMETRIC,
  fontBody: BODY,
  bg: '#fff7f9',
  surface: '#ffffff',
  raised: '#f5f8fc',
  text: '#27131b',
  muted: '#7d5a68',
  line: '#eed9df',
  accent: '#fb5a72',
  accentSoft: '#ffe8ed',
  onAccent: '#ffffff',
  glow: 'rgba(251,90,114,0.18)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Featured reads', note: 'Editorial layouts with brighter discovery blocks and softer reading panels.' },
  listing: { ...base, kicker: 'Business guide', note: 'A clean classified directory with comparison-friendly cards and location cues.' },
  classified: { ...base, kicker: 'Fresh ads', note: 'Quick-scan offers, strong pricing moments, and direct action buttons.' },
  image: { ...base, kicker: 'Photo gallery', note: 'Image-led browsing with bright frames, rounded surfaces, and visual rhythm.' },
  sbm: { ...base, kicker: 'Useful links', note: 'Curated resources displayed like premium recommendation cards.' },
  pdf: { ...base, kicker: 'Document shelf', note: 'Downloads and guides presented in a clean magazine utility layout.' },
  profile: { ...base, kicker: 'People & brands', note: 'Identity-first profiles with simple trust cues and contact rails.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
