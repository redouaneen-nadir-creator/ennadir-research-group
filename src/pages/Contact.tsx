import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { MailIcon, PinIcon } from '@/components/icons'

const CONTACT_EMAIL = 'radouaneennadir@gmail.com'

export default function Contact() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || 'Website enquiry')}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <>
      <Seo title={t('contact.title')} description={t('contact.subtitle')} />
      <PageHeader kicker={t('nav.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-700/50">
              {t('contact.emailLabel')}
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
            >
              <MailIcon className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-700/50">
              {t('contact.addressLabel')}
            </h3>
            <p className="inline-flex items-start gap-2 text-sm text-ink-800">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-700/50" />
              {t('contact.address')}
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-700/50">
              {t('contact.joinTitle')}
            </h3>
            <p className="text-sm leading-relaxed text-ink-700/80">{t('contact.join')}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 rounded border border-ink-900/15 bg-white p-6 lg:col-span-2 sm:p-8">
          <h3 className="text-lg font-semibold text-ink-900">{t('contact.formTitle')}</h3>
          <p className="text-xs text-ink-700/55">{t('contact.formNote')}</p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-700/70">
              {t('contact.nameField')}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded border border-ink-900/15 px-3 py-2 text-sm text-ink-900 focus:border-brand-400"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-700/70">
              {t('contact.emailField')}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded border border-ink-900/15 px-3 py-2 text-sm text-ink-900 focus:border-brand-400"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-700/70">
            {t('contact.subjectField')}
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded border border-ink-900/15 px-3 py-2 text-sm text-ink-900 focus:border-brand-400"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-700/70">
            {t('contact.messageField')}
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-y rounded border border-ink-900/15 px-3 py-2 text-sm text-ink-900 focus:border-brand-400"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-sm bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t('contact.sendButton')}
          </button>
        </form>
      </Container>
    </>
  )
}
