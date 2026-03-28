import { Facebook, Instagram, Music2, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const serviceLinks = [
  "Bonus program",
  "Gift cards",
  "Credit and payment",
  "Service contracts",
  "Non-cash account",
  "Payment",
];

const supportLinks = [
  "Find an order",
  "Terms of delivery",
  "Exchange and return of goods",
  "Guarantee",
  "Frequently asked questions",
  "Terms of use of the site",
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(180,205,255,0.12)] bg-[linear-gradient(180deg,rgba(18,25,38,0.88),rgba(10,15,23,0.94))] text-white shadow-[0_-18px_54px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <Link to="/home" className="text-[2rem] font-black tracking-[-0.06em] text-white">
            cyber
          </Link>
          <p className="mt-8 max-w-sm text-[15px] leading-8 text-white/72">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than thoughtful product curation.
          </p>
          <div className="mt-16 flex items-center gap-6 text-white">
            <Twitter className="h-5 w-5" />
            <Facebook className="h-5 w-5" />
            <Music2 className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
          </div>
        </div>

        <div>
          <h3 className="text-[1.75rem] font-semibold tracking-[-0.04em]">Services</h3>
          <ul className="mt-8 space-y-5 text-[15px] text-white/72">
            {serviceLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[1.75rem] font-semibold tracking-[-0.04em]">
            Assistance to the buyer
          </h3>
          <ul className="mt-8 space-y-5 text-[15px] text-white/72">
            {supportLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
