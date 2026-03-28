import { ArrowRight, LockKeyhole, UserCircle2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useAuth } from "./auth.context";

type AuthMode = "sign-in" | "sign-up";

type FieldProps = {
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function Field({ label, type = "text", value, placeholder, onChange }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="cy-input"
      />
    </label>
  );
}

export default function AuthExperience({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, isBootstrapping, signIn, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const redirectTarget = useMemo(() => searchParams.get("redirect") || "/home", [searchParams]);
  const registered = searchParams.get("registered") === "1";
  const isSignUp = mode === "sign-up";

  useEffect(() => {
    if (!isBootstrapping && isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, isBootstrapping, navigate, redirectTarget]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Password confirmation does not match.");
          return;
        }

        await signUp({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
        const nextParams = new URLSearchParams();
        nextParams.set("registered", "1");
        const redirect = searchParams.get("redirect");
        if (redirect) {
          nextParams.set("redirect", redirect);
        }
        navigate(`/sign-in?${nextParams.toString()}`, { replace: true });
        return;
      } else {
        await signIn({ email: email.trim(), password });
      }

      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to continue right now.";
      const axiosMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(axiosMessage || message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.14),transparent_30%),radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_80%_75%,rgba(143,185,255,0.09),transparent_28%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)] lg:block" />

      <div className="cy-shell relative flex min-h-screen flex-col justify-center py-8 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className={["flex items-center", isSignUp ? "lg:order-2" : ""].join(" ")}>
          <div className="relative w-full overflow-hidden rounded-[40px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.34)] sm:px-10 sm:py-12 lg:min-h-[760px] lg:px-14 lg:py-16">
            <div className="absolute left-[-8%] top-[-8%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(143,185,255,0.2),rgba(143,185,255,0)_70%)]" />
            <div className="absolute bottom-[-16%] right-[-10%] h-[280px] w-[280px] rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col justify-between gap-14">
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--line-soft)] bg-white/[0.04] px-4 py-2 text-sm text-[var(--text-secondary)]">
                <LockKeyhole className="h-4 w-4 text-[var(--accent)]" />
                Customer access
              </div>

              <div className="max-w-[460px] space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Cyber account</p>
                <div className="space-y-3">
                  <h1 className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[var(--text-primary)] sm:text-[4.6rem]">
                    {isSignUp ? "Join the" : "Continue to"}
                  </h1>
                  <Link
                    to="/home"
                    className="inline-flex items-center gap-3 text-[3.2rem] font-semibold tracking-[-0.1em] text-[var(--text-primary)] transition hover:translate-x-1 sm:text-[5.6rem]"
                  >
                    Cyber store
                    <ArrowRight className="h-8 w-8 text-[var(--accent)] sm:h-10 sm:w-10" />
                  </Link>
                </div>
                <p className="max-w-[380px] text-base leading-8 text-[var(--text-secondary)]">
                  {isSignUp
                    ? "Create a customer account to keep your saved products, preserve the cart, and move through checkout without losing momentum."
                    : "Sign in to restore your wishlist, saved addresses, and active purchase flow across the storefront."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={<UserCircle2 className="h-5 w-5" />}
                  title="Guest browsing"
                  copy="Explore the catalog and product detail pages without opening an account."
                />
                <FeatureCard
                  icon={<LockKeyhole className="h-5 w-5" />}
                  title="Member checkout"
                  copy="Unlock cart, saved addresses, order tracking, and payment continuity after sign in."
                />
              </div>
            </div>
          </div>
        </div>

        <div className={["flex items-center", isSignUp ? "lg:order-1" : ""].join(" ")}>
          <div className="cy-panel w-full max-w-[560px] p-7 sm:p-9">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{isSignUp ? "Create account" : "Sign in"}</p>
              <h2 className="text-[2.3rem] font-semibold tracking-[-0.07em] text-[var(--text-primary)] sm:text-[3rem]">
                {isSignUp ? "Become a customer" : "Continue to your account"}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                {isSignUp
                  ? "Register once to keep your saved products, cart, and future orders in one place."
                  : "Use your account to continue with wishlist, cart, and checkout."}
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {!isSignUp && registered ? (
                <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Account created successfully. Sign in to continue.
                </p>
              ) : null}
              {isSignUp ? <Field label="Full name" value={name} onChange={setName} placeholder="Enter your full name" /> : null}
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
              {isSignUp ? <Field label="Phone" value={phone} onChange={setPhone} placeholder="Your phone number" /> : null}
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter your password" />
              {isSignUp ? (
                <Field
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Repeat your password"
                />
              ) : null}

              {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

              <button
                type="submit"
                disabled={submitting || isBootstrapping}
                className="cy-btn-primary inline-flex h-14 w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (isSignUp ? "Creating account..." : "Signing in...") : isSignUp ? "Create customer account" : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 rounded-[28px] border border-[var(--line-soft)] bg-white/[0.03] p-5 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
              <div>{isSignUp ? "Already registered?" : "No customer account yet?"}</div>
              <Link
                to={isSignUp ? `/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}` : `/sign-up${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                className="font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
              >
                {isSignUp ? "Sign in here" : "Create one now"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--line-soft)] bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="inline-flex rounded-full border border-[rgba(143,185,255,0.24)] bg-[rgba(143,185,255,0.12)] p-2 text-[var(--accent)]">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{copy}</p>
    </div>
  );
}
