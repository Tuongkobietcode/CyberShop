import { Clock3, Headphones, Mail, MapPin, MessageSquareText, PhoneCall, Send } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { submitContactInquiry } from "@/features/contact/contact.service";

const supportOptions = [
  {
    icon: Mail,
    title: "Email support",
    value: "duongtuong131004@gmail.com",
    copy: "Best for order questions, warranty requests, and general support.",
  },
  {
    icon: PhoneCall,
    title: "Sales line",
    value: "0862128904",
    copy: "Useful when someone wants help choosing between products quickly.",
  },
  {
    icon: MessageSquareText,
    title: "Live guidance",
    value: "Chat in under 5 min",
    copy: "Fastest path for product advice, stock checks, and checkout issues.",
  },
];

const faqs = [
  {
    question: "How quickly do you respond?",
    answer: "Most messages are answered the same business day. More detailed order issues may take up to 24 hours.",
  },
  {
    question: "What should I include in my message?",
    answer: "If your question is about an order, include your order number and the product name to speed up the first reply.",
  },
  {
    question: "Can I ask for product recommendations?",
    answer: "Yes. Contact is not only for problems. We also use it as a guided sales channel for comparing devices and categories.",
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
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Contact Us" }]} />

      <div className="mx-auto max-w-[1200px] space-y-14 px-4 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[34px] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Contact</p>
            <h1 className="mt-4 text-[2.8rem] font-light leading-none tracking-[-0.06em] sm:text-[3.8rem]">
              Reach the right team
              <span className="font-semibold"> faster</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
              Strong contact pages are easy to find, welcoming, and offer multiple support paths.
              We structured this one around those basics: clear channels, response expectations,
              and quick answers before a message is even sent.
            </p>

            <div className="mt-8 grid gap-4">
              {supportOptions.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-white/10 p-3 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">{item.title}</p>
                        <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">{item.value}</p>
                        <p className="mt-2 text-sm leading-6 text-white/65">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Send a message</p>
                <h2 className="mt-3 text-[2.1rem] font-semibold tracking-[-0.05em] text-slate-950">We read every inquiry</h2>
              </div>
              <div className="rounded-full bg-slate-100 p-3 text-slate-700">
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
                  await submitContactInquiry({
                    name,
                    email,
                    subject,
                    message,
                  });
                  setSubmitted(true);
                  setSubject("");
                  setName("");
                  setEmail("");
                  setMessage("");
                } catch (submitError) {
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
                  className="h-14 rounded-2xl border border-slate-200 bg-[#fbfbfb] px-4 text-sm outline-none transition focus:border-slate-400"
                />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="h-14 rounded-2xl border border-slate-200 bg-[#fbfbfb] px-4 text-sm outline-none transition focus:border-slate-400"
                />
              </div>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Subject"
                className="h-14 rounded-2xl border border-slate-200 bg-[#fbfbfb] px-4 text-sm outline-none transition focus:border-slate-400"
              />
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what you need"
                className="min-h-[180px] rounded-[24px] border border-slate-200 bg-[#fbfbfb] px-4 py-4 text-sm leading-7 outline-none transition focus:border-slate-400"
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Typical response time: same day
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-black px-8 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Message sent successfully. Your inquiry has been saved and is ready for support follow-up.
                </div>
              ) : null}
            </form>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">Studio & support desk</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Street Ba Trieu, Le Dai Hanh<br />
                  Hai Ba Trung<br />
                  Ha Noi
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Mon to Fri: 09:00 - 18:00<br />
                  Sat: 10:00 - 15:00<br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Quick answers</p>
            <div className="mt-6 space-y-5">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-[24px] bg-[#f6f6f6] p-5">
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
