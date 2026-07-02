'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CirclePlus, LogIn, Menu, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const navItems = useMemo(() => {
    const taskItems = SITE_CONFIG.tasks
      .filter((task) => task.enabled && !['listing', 'classified'].includes(task.key))
      .slice(0, 4)
      .map((task) => ({ label: task.label, href: task.route }))

    return [
      ...taskItems,
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/article' },
    ]
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_10px_30px_rgba(154,3,30,0.16)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[86px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          <span className="editable-display text-2xl font-extrabold tracking-[-0.05em] text-white sm:text-3xl">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="ml-4 hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  active ? 'text-white' : 'text-white/86 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <form action="/search" className="hidden items-center gap-2 rounded-full bg-white/16 px-4 py-2 text-white/90 xl:flex">
            <Search className="h-4 w-4" />
            <input
              name="q"
              type="search"
              placeholder="Search ads"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-white/60"
            />
          </form>

          {session ? (
            <>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[var(--slot4-accent)] transition hover:-translate-y-0.5"
              >
                <CirclePlus className="h-4 w-4" /> Post Your Ad
              </Link>
              <button type="button" onClick={logout} className="text-sm font-semibold text-white/92 transition hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-white/92 transition hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)]">
                  <UserRound className="h-4 w-4" />
                </span>
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[var(--slot4-accent)] transition hover:-translate-y-0.5"
              >
                <CirclePlus className="h-4 w-4" /> Post Your Ad
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/15 bg-[var(--editable-nav-bg)] px-4 pb-5 pt-4 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[var(--slot4-page-text)]">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search ads, services, and more" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    active ? 'bg-white text-[var(--slot4-accent)]' : 'bg-white/10 text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[var(--slot4-accent)]">
                  {globalContent.nav.actions.primary.label}
                </Link>
                <button type="button" onClick={logout} className="rounded-2xl bg-white/10 px-4 py-3 text-left text-sm font-semibold text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                  <span className="inline-flex items-center gap-2"><LogIn className="h-4 w-4" /> Sign in</span>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[var(--slot4-accent)]">
                  Post Your Ad
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
