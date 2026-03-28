import { Clock3, Headphones, Mail, MessageSquareText, PhoneCall, Send } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { submitContactInquiry } from "@/features/contact/contact.service";

const supportPaths = [
  {
    icon: MessageSquareText,
    title: "Product help",
    value: "Fast comparison guidance",
    copy: "Use this when someone is choosing between Mac, iPhone, iPad, Watch, Vision, or AirPods.",
  },
  {
    icon: Mail,
    title: "Order support",
    value: "duongtuong131004@gmail.com",
    copy: "Best for payment questions, order changes, and after-purchase help.",
  },
  {
    icon: PhoneCall,
    title: "Sales line",
    value: "0862128904",
    copy: "Ideal for urgent questions that need a real person on the same day.",
  },
];

const quickAnswers = [
  {
    title: "Typical response time",
    copy: "Most support questions are answered on the same business day.",
  },
  {
    title: "Best way to reach us",
    copy: "Use the message form for detailed product or order issues. It keeps context in one place.",
  },
  {
    title: "What to include",
    copy: "Mention your product name or order code so the first reply can be more specific.",
  },
];

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="pb-24">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Contact" }]} />

      <div className="cy-shell space-y-16 pt-10 sm:space-y-20">
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-[620px]">
            <p className="cy-kicker">Contact</p>
            <h1 className="mt-4 text-[3rem] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-[4.6rem]">
              Find the fastest path to help.
            </h1>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-7 text-white/58 sm:text-base">
              We treat support as part of the storefront, not a page hidden after checkout.
              Reach out for product comparisons, order updates, payment questions, or a second opinion before you buy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {supportPaths.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[26px] border border-white/8 bg-white/[0.02] p-5"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white/82">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-sm text-white/44">{item.title}</p>
                  <p className="mt-1 text-[1rem] font-semibold tracking-[-0.03em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/54">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-4">
            <article className="rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(10,13,18,0.9),rgba(7,9,13,0.96))] p-7">
              <p className="cy-kicker">Before you write</p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                Start with the simplest channel first.
              </h2>
              <div className="mt-6 space-y-4">
                {quickAnswers.map((item, index) => (
                  <div key={item.title} className="grid gap-3 border-t border-white/6 pt-4 first:border-t-0 first:pt-0 md:grid-cols-[56px_1fr]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/34">
                      0{index + 1}
                    </p>
                    <div>
                      <h3 className="text-[1.08rem] font-semibold tracking-[-0.03em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/56">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[30px] border border-white/8 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 text-sm text-white/58">
                <Clock3 className="h-4 w-4 text-white/70" />
                Support window: Monday to Friday, 09:00 to 18:00
              </div>
            </article>
          </div>

          <article className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,16,22,0.92),rgba(8,10,14,0.96))] p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="cy-kicker">Send a message</p>
                <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                  Talk to a real person.
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/80">
                <Headphones className="h-5 w-5" />
              </div>
            </div>

            <form
              className="mt-8 grid gap-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                setSubmitted(false);
                setIsSubmitting(true);

                try {
                  await submitContactInquiry({ name, email, subject, message });
                  setSubmitted(true);
                  setSubject("");
                  setName("");
                  setEmail("");
                  setMessage("");
                } catch {
                  setError("Unable to send your message right now. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="cy-input"
                />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="cy-input"
                />
              </div>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Subject"
                className="cy-input"
              />
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what you need"
                className="min-h-[200px] rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(143,185,255,0.35)]"
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-white/52">
                  Best for sales guidance, order help, and after-purchase questions.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cy-btn-primary inline-flex h-14 items-center justify-center gap-3 px-8 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}
              {submitted ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Message sent successfully. Support now has your request.
                </div>
              ) : null}
            </form>
          </article>
        </section>
      </div>
    </div>
  );
}
