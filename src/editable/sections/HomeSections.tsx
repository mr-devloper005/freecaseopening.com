import Link from 'next/link'
import {
  ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, FileText, Image as ImageIcon, MapPin,
  Megaphone, Search, Star, UserRound,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function getExcerpt(post?: SitePost | null, limit = 120) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'General'
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  return Math.round((3.9 + (hashStr(post.slug || post.id || post.title || 'x') % 10) / 10) * 10) / 10
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 80 + (hashStr((post.slug || post.title || 'x') + 'r') % 2200)
}

function latestPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  const seen = new Set<string>()
  return [...posts, ...timeSections.flatMap((section) => section.posts)].filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function Stars({ post }: { post: SitePost }) {
  const rating = Math.round(ratingOf(post))
  return (
    <span className="inline-flex items-center gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? 'fill-[var(--slot4-brand-2)] text-[var(--slot4-brand-2)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`} />
      ))}
    </span>
  )
}

function heroCategoryItems() {
  return SITE_CONFIG.tasks.filter((task) => task.enabled && !['listing', 'classified'].includes(task.key)).slice(0, 7)
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = latestPosts(posts, timeSections)
  const categories = heroCategoryItems()

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-accent)] text-white">
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(154,3,30,0.2))]" />
      <div className="absolute left-0 right-0 top-0 h-full opacity-15 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_22%),radial-gradient(circle_at_80%_18%,white_0,transparent_18%),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]" />
      <div className={`relative ${container} py-10 sm:py-12 lg:py-14`}>
        <div className="flex flex-col gap-8">
          <div className="mx-auto w-full max-w-5xl rounded-[28px] bg-white/12 p-3 shadow-[0_16px_50px_rgba(154,3,30,0.18)] backdrop-blur-sm">
            <form action="/search" className="grid gap-3 md:grid-cols-[0.9fr_2.1fr_0.7fr]">
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-[var(--slot4-page-text)]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <input name="location" placeholder="Select a location" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-[var(--slot4-page-text)]">
                <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </label>
              <button className="rounded-2xl bg-white px-5 py-4 text-sm font-extrabold text-[var(--slot4-page-text)] transition hover:-translate-y-0.5">
                Search
              </button>
            </form>
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <h1 className="editable-display text-balance text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] drop-shadow-[0_6px_16px_rgba(120,10,35,0.22)] sm:text-5xl lg:text-[3.4rem]">
              {pagesContent.home.hero.title.join(' ')}
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-base text-white/92 sm:text-xl">
              Find the latest listings, local services, business posts, and useful updates all in one place.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-start justify-center gap-5 sm:gap-8">
            {categories.map((task) => {
              const Icon = taskIcon[task.key] || FileText
              return (
                <Link key={task.key} href={task.route} className="group flex w-[112px] flex-col items-center text-center sm:w-[130px]">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)] shadow-[0_14px_30px_rgba(120,10,35,0.16)] transition group-hover:-translate-y-1 group-hover:scale-[1.02] sm:h-24 sm:w-24">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span className="mt-4 text-sm font-bold leading-5 text-white">{task.label}</span>
                </Link>
              )
            })}
          </div>

          {pool[0] ? (
            <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm">
              <span className="font-semibold">Featured now:</span>
              <Link href={postHref(primaryTask, pool[0], primaryRoute)} className="truncate font-medium hover:underline">
                {pool[0].title}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function FeaturedAdCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  return (
    <article className="group overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(19,67,118,0.18)] transition duration-300 hover:-translate-y-1.5">
      <Link href={href} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <p className="text-sm text-[var(--slot4-muted-text)]">{categoryOf(post)}</p>
        <Link href={href} className="line-clamp-2 block text-[1.75rem] font-extrabold leading-9 tracking-[-0.03em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
          <Stars post={post} />
          <span>{reviewsOf(post)} views</span>
        </div>
      </div>
    </article>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const featured = latestPosts(posts, timeSections).slice(0, 4)
  if (!featured.length) return null

  return (
    <section className="bg-[var(--slot4-brand-blue)]">
      <div className={`${container} py-12 sm:py-14`}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="editable-display text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">Featured Ads</h2>
          <Link href={primaryRoute} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[var(--slot4-brand-blue)] transition hover:-translate-y-0.5">
            See All Ads
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((post) => (
            <FeaturedAdCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompactAdCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  return (
    <article className="overflow-hidden rounded-[18px] border border-[var(--editable-border)] bg-white shadow-[0_12px_26px_rgba(84,22,44,0.08)]">
      <Link href={href} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]" loading="lazy" />
        </div>
      </Link>
      <div className="p-5">
        <Link href={href} className="line-clamp-2 text-2xl font-extrabold leading-8 tracking-[-0.03em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
          <Stars post={post} />
          <span>{categoryOf(post)}</span>
        </div>
      </div>
    </article>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  return (
    <article className="group grid overflow-hidden rounded-[22px] border border-[var(--editable-border)] bg-white shadow-[0_14px_36px_rgba(84,22,44,0.08)] md:grid-cols-[240px_minmax(0,1fr)]">
      <Link href={href} className="block overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
      </Link>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
        <Link href={href} className="mt-3 block text-2xl font-extrabold leading-8 tracking-[-0.03em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getExcerpt(post, 150)}</p>
      </div>
    </article>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 rounded-[20px] border border-[var(--editable-border)] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(84,22,44,0.06)] transition hover:-translate-y-1">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-sm font-extrabold text-white">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-7 tracking-[-0.03em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const recent = latestPosts(posts, timeSections).slice(0, 8)
  if (!recent.length) return null

  return (
    <section className="bg-[var(--slot4-gray)]">
      <div className={`${container} py-12 sm:py-14`}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="editable-display text-3xl font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-4xl">Recent Ads</h2>
          <Link href={primaryRoute} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
            See All Ads
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {recent.slice(0, 4).map((post) => (
              <CompactAdCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
          <div className="space-y-5">
            {recent.slice(4, 8).map((post, index) => (
              <EditorialListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const latest = latestPosts(posts, timeSections)
  if (!latest.length) return null

  const browse = latest.slice(0, 3)
  const boards = SITE_CONFIG.tasks.filter((task) => task.enabled && !['listing', 'classified'].includes(task.key)).slice(0, 6)

  return (
    <>
      <section className="bg-white">
        <div className={`${container} py-12 sm:py-14`}>
          <div className="mb-8">
            <h2 className="editable-display text-center text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">All Category</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {boards.map((task, index) => {
              const sample = latest[index]
              const Icon = taskIcon[task.key] || BriefcaseBusiness
              return (
                <Link key={task.key} href={task.route} className="rounded-[22px] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-6 shadow-[0_12px_28px_rgba(84,22,44,0.06)] transition hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{task.label}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[var(--slot4-muted-text)]">
                    {sample ? getExcerpt(sample, 130) : `Explore recent ${task.label.toLowerCase()} posts and useful local updates.`}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">
                    Browse now <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--slot4-warm)]">
        <div className={`${container} py-12 sm:py-14`}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Latest spotlight</p>
              <h2 className="editable-display mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Business finds and featured posts</h2>
            </div>
            <Link href={primaryRoute} className="hidden rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-bold text-white md:inline-flex">
              View More
            </Link>
          </div>
          <div className="grid gap-6">
            {browse.map((post) => (
              <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-dark-bg)] text-white">
      <div className={`grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center ${container}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-brand-2)]">{pagesContent.home.cta.badge}</p>
          <h2 className="editable-display mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            {pagesContent.home.cta.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">{pagesContent.home.cta.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={pagesContent.home.cta.primaryCta.href} className="rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
            {pagesContent.home.cta.primaryCta.label}
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
