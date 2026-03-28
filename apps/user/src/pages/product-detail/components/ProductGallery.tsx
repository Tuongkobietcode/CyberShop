import { useState } from "react";
import { resolveAssetUrl } from "@/utils/assets";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  return (
    <div className="grid gap-4 sm:grid-cols-[82px_minmax(0,1fr)]">
      <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={[
              "flex h-[86px] w-[78px] items-center justify-center rounded-[22px] border bg-white/[0.03] p-2 transition",
              activeImage === image
                ? "border-[var(--accent)]/40 bg-white/[0.05]"
                : "border-white/8 opacity-70 hover:opacity-100",
            ].join(" ")}
          >
            <img src={resolveAssetUrl(image)} alt={name} className="max-h-full object-contain" />
          </button>
        ))}
      </div>

      <div className="order-1 flex min-h-[520px] items-center justify-center rounded-[34px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.12),rgba(255,255,255,0.02)_44%,rgba(255,255,255,0.01)_100%)] p-6 sm:order-2">
        <img
          src={resolveAssetUrl(activeImage)}
          alt={name}
          className="max-h-[500px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.38)]"
        />
      </div>
    </div>
  );
}
