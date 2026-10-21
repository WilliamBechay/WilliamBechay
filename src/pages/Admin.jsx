import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { LogOut, Lock, Inbox } from 'lucide-react';

const SESSION_STORAGE_KEY = 'admin_session_token';

const Admin = () => {
  const { translations, language } = useLanguage();
  const { toast } = useToast();
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_STORAGE_KEY) || null);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('admin-messages', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error || data?.error) {
      // Session invalide ou expiree -> on deconnecte proprement.
      if (error?.context?.status === 401 || data?.error) {
        handleLogout();
      }
      toast({
        title: translations.contact.toast.error.title,
        description: 'Failed to fetch messages.',
        variant: 'destructive',
      });
      console.error('Error fetching messages:', error || data?.error);
    } else {
      setMessages(data?.messages || []);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    const { data, error } = await supabase.functions.invoke('admin-login', {
      body: { password },
    });

    setIsVerifying(false);

    if (error || !data?.success) {
      toast({
        title: 'Authentication Failed',
        description: translations.admin.login.error,
        variant: 'destructive',
      });
      console.error('Login error:', error || data?.error);
    } else {
      sessionStorage.setItem(SESSION_STORAGE_KEY, data.token);
      setToken(data.token);
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setToken(null);
    setPassword('');
    setMessages([]);
  };

  if (!translations) return null;

  const d = translations.admin.dashboard;

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{translations.admin.meta.title}</title>
          <meta name="description" content={translations.admin.meta.description} />
        </Helmet>
        {/* La hauteur plein ecran vient d-une classe : en JS, les deux
            declarations min-height (vh en repli, svh ensuite) seraient
            deux cles identiques dans un meme objet, donc une seule
            survivrait — et ce serait le repli qui disparaitrait. */}
        <div className="min-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="card w-full"
            style={{ maxWidth: 400, padding: 'clamp(24px, 4vw, 36px)' }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="eyebrow">
                <Lock size={12} />
                {translations.admin.login.title}
              </span>
              <p className="t-lead" style={{ marginTop: 16 }}>
                {translations.admin.login.subtitle}
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ marginTop: 26 }}>
              <label htmlFor="password" className="field-label">
                {translations.admin.login.password}
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={translations.admin.login.passwordPlaceholder}
                required
              />
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: 20 }} disabled={isVerifying}>
                {isVerifying ? translations.admin.login.verifying : translations.admin.login.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  const getReasonLabel = (reasonKey) => {
    const reasonTranslations = translations?.contact?.form?.reason;
    if (!reasonTranslations) return reasonKey;

    const reasons = {
      project: reasonTranslations.project,
      bug: reasonTranslations.bug,
      collaboration: reasonTranslations.collaboration,
      general: reasonTranslations.general,
    };
    return reasons[reasonKey] || reasonKey;
  };

  // La date suit la langue de l-interface, pas celle du navigateur : la
  // page bascule en francais et la colonne restait au format anglais.
  const formatDate = (value) =>
    new Date(value).toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const columns = [d.name, d.email, d.reason, d.subject, d.message, d.date];

  const emptyRow = loading ? d.loading : d.noMessages;
  const isEmpty = loading || messages.length === 0;

  return (
    <>
      <Helmet>
        <title>{translations.admin.meta.title}</title>
        <meta name="description" content={translations.admin.meta.description} />
      </Helmet>

      <div className="container mx-auto px-6" style={{ paddingTop: 'clamp(40px, 6vw, 72px)', paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4" style={{ marginBottom: 'clamp(24px, 3.5vw, 40px)' }}>
            <div>
              <h1 className="t-title-1">{d.title}</h1>
              <p className="t-lead" style={{ marginTop: 10 }}>{d.subtitle}</p>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              <LogOut size={15} />
              {d.logout}
            </button>
          </div>

          {/* Vue large : le tableau. */}
          <div className="card hidden md:block" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    {columns.map((label) => <th key={label}>{label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {isEmpty ? (
                    <tr>
                      <td colSpan={columns.length} className="admin-empty">{emptyRow}</td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg.id}>
                        <td className="admin-strong">{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{getReasonLabel(msg.reason) || '-'}</td>
                        <td>{msg.subject || '-'}</td>
                        {/* Le message est tronque pour tenir dans la ligne ;
                            l-attribut title rend le texte entier lisible au
                            survol, et la vue en cartes le montre en entier. */}
                        <td className="admin-message" title={msg.message}>{msg.message}</td>
                        <td className="admin-nowrap">{formatDate(msg.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vue etroite : une carte par message. Un tableau de six colonnes
              dans un conteneur a defilement horizontal se lit au doigt en
              poussant la page de cote — sur un telephone, le message lui-meme,
              qui est la seule raison d-ouvrir cette page, restait hors champ. */}
          <div className="md:hidden flex flex-col gap-3">
            {isEmpty ? (
              <div className="card flex flex-col items-center text-center" style={{ padding: 32 }}>
                <Inbox size={20} style={{ color: 'hsl(var(--muted-foreground))' }} />
                <p className="t-caption" style={{ marginTop: 10 }}>{emptyRow}</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.article
                    key={msg.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="card"
                    style={{ padding: 18 }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="t-title-3">{msg.name}</h2>
                      <span className="t-caption admin-nowrap">{formatDate(msg.created_at)}</span>
                    </div>

                    <a href={`mailto:${msg.email}`} className="footer-link t-caption" style={{ display: 'inline-block', marginTop: 2 }}>
                      {msg.email}
                    </a>

                    <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
                      {msg.reason && <span className="eyebrow">{getReasonLabel(msg.reason)}</span>}
                      {msg.subject && <span className="admin-chip">{msg.subject}</span>}
                    </div>

                    <p className="card-copy" style={{ marginTop: 12 }}>{msg.message}</p>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Admin;
