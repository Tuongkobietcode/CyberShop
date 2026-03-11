import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/images/logo.png"
              alt="Cyber logo"
            />
          </div>

          <p className="text-sm leading-relaxed max-w-sm">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>

          <div className="flex gap-4">
            {["Twitter", "Facebook", "Tiktok", "Instagram"].map((icon) => (
              <img
                key={icon}
                src={`/src/assets/images/${icon}.png`}
                alt={icon}
                className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>

        {/* MIDDLE */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              "Bonus program",
              "Gift cards",
              "Credit and payment",
              "Service contracts",
              "Non-cash account",
              "Payment",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Assistance to the buyer
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "Find an order",
              "Terms of delivery",
              "Exchange and return of goods",
              "Guarantee",
              "Frequently asked questions",
              "Terms of use of the site",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
