export default function CreditCardForm({
  sameAsBilling,
  onToggleSameAsBilling,
}: {
  sameAsBilling: boolean;
  onToggleSameAsBilling: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="max-w-[360px] rounded-[24px] bg-black p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between text-[#ffd24c]">
          <div className="h-10 w-14 rounded-md bg-[#f8d457]" />
          <div className="text-2xl">)))</div>
        </div>
        <p className="mt-16 text-[2rem] tracking-[0.18em]">4085 9536 8475 9530</p>
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="text-sm text-white/60">Cardholder</p>
            <p className="mt-2 text-lg">Cyber User</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-[#ff5f00]" />
            <span className="-ml-4 h-8 w-8 rounded-full bg-[#ffb547]" />
          </div>
        </div>
      </div>

      <input className="h-16 w-full rounded-2xl border border-black/10 bg-white px-5 text-base outline-none" placeholder="Cardholder Name" />
      <input className="h-16 w-full rounded-2xl border border-black/10 bg-white px-5 text-base outline-none" placeholder="Card Number" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="h-16 rounded-2xl border border-black/10 bg-white px-5 text-base outline-none" placeholder="Exp.Date" />
        <input className="h-16 rounded-2xl border border-black/10 bg-white px-5 text-base outline-none" placeholder="CVV" />
      </div>

      <label className="flex items-center gap-3 text-[1.05rem] text-black">
        <input type="checkbox" checked={sameAsBilling} onChange={(event) => onToggleSameAsBilling(event.target.checked)} className="h-5 w-5 rounded border-black/20" />
        Same as billing address
      </label>
    </div>
  );
}
