'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && !['listing', 'classified'].includes(task.key))
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-auto bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            <span className="editable-display text-3xl font-extrabold tracking-[-0.05em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold">How to Sell Fast</h3>
          <div className="mt-5 h-1 w-10 rounded-full bg-[var(--slot4-accent)]" />
          <div className="mt-6 grid gap-3">
            <Link href="/create" className="text-sm text-white/72 transition hover:text-white">Post a clear title</Link>
            <Link href="/article" className="text-sm text-white/72 transition hover:text-white">Read practical guides</Link>
            <Link href="/search" className="text-sm text-white/72 transition hover:text-white">Search the site</Link>
            <Link href="/contact" className="text-sm text-white/72 transition hover:text-white">Get support</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold">Help & Support</h3>
          <div className="mt-5 h-1 w-10 rounded-full bg-[var(--slot4-accent)]" />
          <div className="mt-6 grid gap-3">
            <Link href="/about" className="text-sm text-white/72 transition hover:text-white">About</Link>
            <Link href="/contact" className="text-sm text-white/72 transition hover:text-white">Contact</Link>
            {session ? (
              <>
                <Link href="/create" className="text-sm text-white/72 transition hover:text-white">Create Post</Link>
                <button type="button" onClick={logout} className="text-left text-sm text-white/72 transition hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-white/72 transition hover:text-white">Sign in</Link>
                <Link href="/signup" className="text-sm text-white/72 transition hover:text-white">Create account</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-2 px-4 py-5 text-sm text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{globalContent.footer.bottomNote}</p>
        </div>
      </div>
    </footer>
  )
}
