export default function CreditCardForm({
  method,
  sameAsBilling,
  onToggleSameAsBilling,
}: {
  method: "vnpay" | "cod";
  sameAsBilling: boolean;
  onToggleSameAsBilling: (value: boolean) => void;
}) {
  if (method === "vnpay") {
    return (
      <div className="space-y-5">
        <div className="rounded-[28px] border border-black/10 bg-white p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-black/38">VNPay Sandbox</p>
          <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] text-black">Redirect payment flow</h3>
          <div className="mt-5 space-y-3 text-[1.02rem] leading-7 text-black/62">
            <p>You will be redirected to the hosted VNPay payment page after pressing the payment button.</p>
            <p>Use the VNPay sandbox account and card data on the hosted page to simulate a successful or failed payment.</p>
            <p>The order will only be marked paid after the backend receives a valid IPN callback from VNPay.</p>
          </div>
        </div>

        <label className="flex items-center gap-3 text-[1.05rem] text-black">
          <input type="checkbox" checked={sameAsBilling} onChange={(event) => onToggleSameAsBilling(event.target.checked)} className="h-5 w-5 rounded border-black/20" />
          Shipping address is also the billing address
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-black/10 bg-[#f7f7f8] p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-black/38">Cash on delivery</p>
        <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] text-black">Pay when your order arrives</h3>
        <div className="mt-5 space-y-3 text-[1.02rem] leading-7 text-black/62">
          <p>The order is created immediately in the store system and will stay in pending payment until it is collected at delivery.</p>
          <p>No redirect is required for this method.</p>
        </div>
      </div>

      <label className="flex items-center gap-3 text-[1.05rem] text-black">
        <input type="checkbox" checked={sameAsBilling} onChange={(event) => onToggleSameAsBilling(event.target.checked)} className="h-5 w-5 rounded border-black/20" />
        Shipping address is also the billing address
      </label>
    </div>
  );
}
