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
      <span className="text-sm font-medium text-black/58">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-[15px] text-black outline-none transition placeholder:text-black/32 focus:border-black/35 focus:bg-white"
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
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f8] text-black">
      <div className="absolute inset-x-0 top-0 h-px bg-black/12" />
      <div className="absolute left-[-22rem] top-[-16rem] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.95),rgba(17,24,39,0.88)_42%,rgba(17,24,39,0)_70%)] opacity-95 blur-[8px]" />
      <div className="absolute right-[-16rem] bottom-[-18rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.12),rgba(15,23,42,0)_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.76),transparent_38%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-10 xl:px-16">
        <div className={["order-2 flex flex-1 items-center justify-center lg:order-none", isSignUp ? "lg:justify-start" : "lg:justify-end"].join(" ")}>
          <div className="relative w-full max-w-[610px] overflow-hidden rounded-[42px] border border-black/8 bg-black px-8 py-12 text-white shadow-[0_36px_90px_rgba(15,23,42,0.22)] sm:px-12 sm:py-16 lg:min-h-[720px]">
            <div className="absolute left-[-18%] top-[-10%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),rgba(255,255,255,0)_68%)]" />
            <div className="absolute bottom-[-14%] right-[-8%] h-[280px] w-[280px] rounded-full border border-white/10" />
            <div className="relative flex h-full flex-col justify-between gap-12">
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm text-white/72 backdrop-blur-sm">
                <LockKeyhole className="h-4 w-4" />
                Customer access
              </div>

              <div className="max-w-[420px] space-y-6">
                <p className="text-sm uppercase tracking-[0.28em] text-white/52">Cyber account</p>
                <div className="space-y-3">
                  <h1 className="text-[2.8rem] font-semibold leading-none tracking-[-0.08em] sm:text-[4.6rem]">
                    {isSignUp ? "Join" : "Welcome to"}
                  </h1>
                  <Link
                    to="/home"
                    className="inline-flex items-center gap-3 text-[3rem] font-black tracking-[-0.1em] text-white transition hover:translate-x-1 sm:text-[5.3rem]"
                  >
                    Cyber
                    <ArrowRight className="h-8 w-8 sm:h-10 sm:w-10" />
                  </Link>
                </div>
                <p className="max-w-[360px] text-[15px] leading-7 text-white/68 sm:text-base">
                  {isSignUp
                    ? "Create your customer account to save devices, build a wishlist, and finish checkout without losing your flow."
                    : "Browse as a guest if you want. Sign in when you are ready to save products, manage your cart, and check out."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard icon={<UserCircle2 className="h-5 w-5" />} title="Guest mode" copy="View catalog, search products, and explore content without creating an account." />
                <FeatureCard icon={<LockKeyhole className="h-5 w-5" />} title="Customer mode" copy="Unlock wishlist, cart, checkout, and your account dashboard after signing in." />
              </div>
            </div>
          </div>
        </div>

        <div className={["order-1 flex flex-1 items-center justify-center lg:order-none", isSignUp ? "lg:justify-end" : "lg:justify-start"].join(" ")}>
          <div className="w-full max-w-[520px] rounded-[36px] border border-black/8 bg-white/92 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-9">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-black/38">{isSignUp ? "Create account" : "Sign in"}</p>
              <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-black sm:text-[2.8rem]">
                {isSignUp ? "Become a customer" : "Continue to your account"}
              </h2>
              <p className="text-sm leading-7 text-black/52 sm:text-[15px]">
                {isSignUp
                  ? "Register once to keep your saved products, cart, and future orders in one place."
                  : "Use your customer account to continue with wishlist, cart, and checkout."}
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {!isSignUp && registered ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
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

              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

              <button
                type="submit"
                disabled={submitting || isBootstrapping}
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-black text-[15px] font-semibold text-white transition hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (isSignUp ? "Creating account..." : "Signing in...") : isSignUp ? "Create customer account" : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 rounded-[28px] border border-black/8 bg-[#fafafa] p-5 text-sm text-black/56 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {isSignUp ? "Already registered?" : "No customer account yet?"}
              </div>
              <Link
                to={isSignUp ? `/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}` : `/sign-up${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                className="font-semibold text-black transition hover:text-black/70"
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
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
      <div className="inline-flex rounded-full bg-white/10 p-2 text-white">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">{copy}</p>
    </div>
  );
}
