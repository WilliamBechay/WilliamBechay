import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import SectionHead from '@/components/SectionHead';

const Contact = () => {
  const { translations: t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', reason: '', message: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const g = (path, fallback) => {
    if (!t) return fallback;
    return path.split('.').reduce((o, k) => o && o[k], t) || fallback;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, subject, reason, message, website } = formData;

    const { data, error: invokeError } = await supabase.functions.invoke('contact-submit', {
      body: { name, email, subject, reason, message, website },
    });

    setIsSubmitting(false);

    if (invokeError || !data?.success) {
      toast({ title: g('contact.toast.error.title', 'Error!'), description: g('contact.toast.error.description', 'Could not send. Please try again.'), variant: 'destructive' });
    } else {
      toast({ title: g('contact.toast.success.title', 'Message Sent!'), description: g('contact.toast.success.description', 'Thank you! I will get back to you shortly.') });
      setFormData({ name: '', email: '', subject: '', reason: '', message: '', website: '' });
    }
  };

  const reasons = [
    { value: 'project',       label: g('contact.form.reason.project',       'New Project Inquiry') },
    { value: 'bug',           label: g('contact.form.reason.bug',           'Bug Report') },
    { value: 'collaboration', label: g('contact.form.reason.collaboration', 'Collaboration Proposal') },
    { value: 'general',       label: g('contact.form.reason.general',       'General Question') },
  ];

  const socials = [
    { href: 'https://www.linkedin.com/in/william-bechay', label: 'LinkedIn', icon: <Linkedin size={17} /> },
    { href: 'https://github.com/williambechay',           label: 'GitHub',   icon: <Github size={17} /> },
  ];

  return (
    <>
      <Helmet>
        <title>{g('contact.meta.title', 'Contact - William Béchay')}</title>
        <meta name="description" content={g('contact.meta.description', 'Get in touch with William Béchay.')} />
      </Helmet>

      <div className="relative px-6" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(64px, 9vw, 104px)', minHeight: 'calc(100svh - var(--nav-h))' }}>
        <div className="relative z-10 container mx-auto max-w-2xl">

          <SectionHead
            eyebrow={g('contact.heading', 'Contact')}
            icon={<Mail size={12} />}
            title={g('contact.form.title', 'Get In Touch')}
            subtitle={g('contact.subtitle', "Fill out the form below and I'll get back to you as soon as possible.")}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="card"
            style={{ marginTop: 'clamp(32px, 4vw, 48px)', padding: 'clamp(22px, 3.5vw, 36px)' }}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Honeypot anti-bot : champ invisible aux humains (CSS + hors flux
                  tabulation). Un bot qui remplit tous les champs le remplira aussi ;
                  l-Edge Function contact-submit detecte et ignore silencieusement
                  ces soumissions. */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="name" className="field-label">{g('contact.form.name', 'Name')}</label>
                <Input id="name" name="name" type="text" autoComplete="name" placeholder={g('contact.form.namePlaceholder', 'Your Name')} value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="email" className="field-label">{g('contact.form.email', 'Email')}</label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder={g('contact.form.emailPlaceholder', 'Your Email')} value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="subject" className="field-label">{g('contact.form.subject', 'Subject')}</label>
                <Input id="subject" name="subject" type="text" placeholder={g('contact.form.subjectPlaceholder', 'What is this about?')} value={formData.subject} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="reason" className="field-label">{g('contact.form.reason.label', 'Reason')}</label>
                <Select onValueChange={(v) => setFormData((p) => ({ ...p, reason: v }))} value={formData.reason}>
                  <SelectTrigger id="reason" className="field">
                    <SelectValue placeholder={g('contact.form.reason.placeholder', 'Select a reason')} />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="field-label">{g('contact.form.message', 'Message')}</label>
                <Textarea id="message" name="message" placeholder={g('contact.form.messagePlaceholder', 'Your message here...')} value={formData.message} onChange={handleChange} required rows={6} className="resize-y" />
              </div>

              <div className="md:col-span-2 flex justify-end" style={{ marginTop: 4 }}>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" />{g('contact.form.sending', 'Sending...')}</>
                  ) : (
                    <><Send size={16} className="btn-arrow" />{g('contact.form.submit', 'Send Message')}</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="text-center flex flex-col items-center"
            style={{ marginTop: 48 }}
          >
            <p className="t-caption" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, fontSize: 11 }}>
              {g('contact.otherWays', 'Other Ways to Connect')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4" style={{ marginTop: 18 }}>
              <a
                href={`mailto:${g('contact.options.email', 'williambechay@hotmail.com')}`}
                className="footer-link inline-flex items-center gap-2"
                style={{ fontSize: 'var(--fs-callout)', color: 'hsl(var(--muted-foreground))' }}
              >
                <Mail size={15} />
                {g('contact.options.email', 'williambechay@hotmail.com')}
              </a>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-link">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <p className="t-caption" style={{ marginTop: 32, fontStyle: 'italic', opacity: 0.7 }}>
              {g('contact.tagline', "Can't build it, can't understand it.")}
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Contact;
