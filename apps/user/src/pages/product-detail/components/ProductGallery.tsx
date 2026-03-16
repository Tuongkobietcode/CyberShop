import { useEffect, useState } from "react";
import { resolveAssetUrl } from "@/utils/assets";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  useEffect(() => {
    setActiveImage(images[0] || "");
  }, [images]);

  return (
    <div className="grid gap-4 sm:grid-cols-[72px_minmax(0,1fr)]">
      <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={[
              "flex h-[78px] w-[74px] items-center justify-center rounded-2xl bg-[#f5f5f5] p-2 transition",
              activeImage === image
                ? "ring-2 ring-black"
                : "opacity-70 hover:opacity-100",
            ].join(" ")}
          >
            <img
              src={resolveAssetUrl(image)}
              alt={name}
              className="max-h-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex min-h-[520px] items-center justify-center rounded-[32px] bg-white p-6 sm:order-2">
        <img
          src={resolveAssetUrl(activeImage)}
          alt={name}
          className="max-h-[500px] object-contain"
        />
      </div>
    </div>
  );
}
