import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ROOMS, STYLES } from '../data/designs';
import { useFavorites } from '../hooks/useFavorites';

const ease = [0.16, 1, 0.3, 1];
const EMPTY = { name: '', email: '', space: '', style: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (!values.space) errors.space = 'Choose the space you are planning.';
  if (values.message.trim().length < 20)
    errors.message = `Tell us a little more (${Math.max(0, 20 - values.message.trim().length)} more characters).`;
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="type-meta block">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-[13px] text-[#9A3B2E]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const { count } = useFavorites();

  const errors = validate(values);
  const showError = (key) => (touched[key] ? errors[key] : undefined);

  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, space: true, message: true });
    if (Object.keys(errors).length) {
      const first = ['name', 'email', 'space', 'message'].find((k) => errors[k]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setSubmitted({ ...values });
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(null);
  };

  const aria = (key) => ({
    'aria-invalid': showError(key) ? 'true' : 'false',
    'aria-describedby': showError(key) ? `contact-${key}-error` : undefined,
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-linen">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="type-h2 max-w-[11ch]">
            Start Your Design Journey
          </h2>
          <p className="type-lead mt-6 max-w-[40ch]">
            Plan a room concept and test the interactive brief builder. Choose your room, pick a style and preview your
            design notes.
          </p>
          <dl className="mt-12 grid gap-6 border-t border-charcoal/15 pt-8 text-[15px] sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="type-meta">Project</dt>
              <dd className="mt-1">HOMORA Interior Inspiration</dd>
            </div>
            <div>
              <dt className="type-meta">Your saved designs</dt>
              <dd className="mt-1">
                {count === 0 ? 'None yet' : `${count} saved in this browser`}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease }}
                className="bg-ivory p-8 sm:p-12"
                role="status"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-olive text-ivory">
                  <Check size={22} strokeWidth={1.8} />
                </span>
                <h3 className="type-h3 mt-8">Thank you, {submitted.name.trim().split(' ')[0]}.</h3>
                <p className="type-lead mt-4 max-w-[46ch]">
                  Your {submitted.space.toLowerCase()} brief
                  {submitted.style ? ` in a ${submitted.style.toLowerCase()} style` : ''} is ready.
                </p>
                <p className="type-meta mt-6 max-w-[52ch]">
                  This is a frontend-only demo, so your message stayed in this browser and was not sent anywhere.
                </p>
                <button type="button" onClick={reset} className="btn btn-outline mt-10">
                  Write another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 sm:grid-cols-2"
              >
                <Field id="contact-name" label="Full name" error={showError('name')}>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    onBlur={blur('name')}
                    className="field"
                    placeholder="Your name"
                    {...aria('name')}
                  />
                </Field>
                <Field id="contact-email" label="Email" error={showError('email')}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update('email')}
                    onBlur={blur('email')}
                    className="field"
                    placeholder="name@example.com"
                    {...aria('email')}
                  />
                </Field>
                <Field id="contact-space" label="Space" error={showError('space')}>
                  <select
                    id="contact-space"
                    value={values.space}
                    onChange={update('space')}
                    onBlur={blur('space')}
                    className="field cursor-pointer"
                    {...aria('space')}
                  >
                    <option value="">Choose a space</option>
                    {[...ROOMS, 'Whole home'].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="contact-style" label="Preferred style (optional)">
                  <select
                    id="contact-style"
                    value={values.style}
                    onChange={update('style')}
                    className="field cursor-pointer"
                  >
                    <option value="">Not sure yet</option>
                    {STYLES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id="contact-message" label="About your space" error={showError('message')}>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={values.message}
                      onChange={update('message')}
                      onBlur={blur('message')}
                      className="field resize-none"
                      placeholder="What do you love, what needs to change, and how should it feel?"
                      {...aria('message')}
                    />
                  </Field>
                </div>
                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="type-meta max-w-[40ch]">Demo form: nothing is sent or stored on a server.</p>
                  <button type="submit" className="btn btn-dark self-start sm:self-auto">
                    Send message
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
