import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';

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
    setFormData(prev => ({ ...prev, [name]: value }));
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
    { href: 'https://www.linkedin.com/in/william-bechay', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
    { href: 'https://github.com/williambechay',           label: 'GitHub',   icon: <Github   className="w-4 h-4" /> },
  ];

  const inputClass = "bg-background/50 border-border/50 focus:border-primary transition-colors text-sm";

  return (
    <>
      <Helmet>
        <title>{g('contact.meta.title', 'Contact - William Béchay')}</title>
        <meta name="description" content={g('contact.meta.description', 'Get in touch with William Béchay.')} />
      </Helmet>

      {/* pt-6/8/10 : même logique de marge responsive que la Home, sous le header */}
      <div className="relative min-h-[calc(100vh-7rem)] pt-6 sm:pt-8 md:pt-10 pb-12 md:pb-16 px-4">
        <div className="relative z-10 container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            {/* Header — same pattern as other sections */}
            <div className="text-center mb-8 flex flex-col items-center gap-3">
              <div style={badge}>
                <Mail style={{ width: 11, height: 11 }} />
                {g('contact.heading', 'Contact')}
              </div>
              <h1 style={sectionTitle}>{g('contact.form.title', 'Get In Touch')}</h1>
              <p style={subtitleStyle}>{g('contact.subtitle', "Fill out the form below and I'll get back to you as soon as possible.")}</p>
              <div style={accentLine} />
            </div>

            {/* Form card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 md:p-8 mb-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Honeypot anti-bot : champ invisible aux humains (CSS + hors flux tabulation).
                    Un bot qui remplit tous les champs le remplira aussi ; l'Edge Function
                    contact-submit détecte et ignore silencieusement ces soumissions. */}
                <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-muted-foreground">{g('contact.form.name', 'Name')}</label>
                  <Input id="name" name="name" type="text" placeholder={g('contact.form.namePlaceholder', 'Your Name')} value={formData.name} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground">{g('contact.form.email', 'Email')}</label>
                  <Input id="email" name="email" type="email" placeholder={g('contact.form.emailPlaceholder', 'Your Email')} value={formData.email} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">{g('contact.form.subject', 'Subject')}</label>
                  <Input id="subject" name="subject" type="text" placeholder={g('contact.form.subjectPlaceholder', 'What is this about?')} value={formData.subject} onChange={handleChange} className={inputClass} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reason" className="text-xs font-medium text-muted-foreground">{g('contact.form.reason.label', 'Reason')}</label>
                  <Select onValueChange={v => setFormData(p => ({ ...p, reason: v }))} value={formData.reason}>
                    <SelectTrigger id="reason" className={`w-full ${inputClass}`}>
                      <SelectValue placeholder={g('contact.form.reason.placeholder', 'Select a reason')} />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-muted-foreground">{g('contact.form.message', 'Message')}</label>
                  <Textarea id="message" name="message" placeholder={g('contact.form.messagePlaceholder', 'Your message here...')} value={formData.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} />
                </div>

                {/* Slim button — same style as home */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50"
                    style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
                  >
                    {isSubmitting ? (
                      <><Loader2 size={12} className="animate-spin" />{g('contact.form.sending', 'Sending...')}</>
                    ) : (
                      <><Send size={12} className="group-hover:translate-x-0.5 transition-transform" />{g('contact.form.submit', 'Send Message')}</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Other ways */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-center space-y-4">
              <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {g('contact.otherWays', 'Other Ways to Connect')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`mailto:${g('contact.options.email', 'williambechay@hotmail.com')}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {g('contact.options.email', 'williambechay@hotmail.com')}
                </a>
                <div className="flex items-center gap-2">
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground/60 italic">{g('contact.tagline', "Can't build it, can't understand it.")}</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
