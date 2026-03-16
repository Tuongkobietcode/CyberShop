import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "@/features/auth/auth.context";

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to send reset link.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
      <div className="w-full max-w-[460px] rounded-3xl border border-black/8 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <LockKeyhole className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Reset password</h1>
        </div>

        {sent ? (
          <p className="text-sm text-black/60">
            If the email exists, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-black/60">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-black/10 px-3"
              />
            </label>

            {error && (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="h-12 w-full rounded-xl bg-black text-white"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <Link
          to="/sign-in"
          className="mt-6 block text-sm font-medium text-black/60 hover:text-black"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}