import React, { useEffect, useState } from "react";
import {
  Camera,
  Image as ImageIcon,
  X,
  ZoomIn,
  MessageCircle,
} from "lucide-react";

import { sanityClient } from "../lib/sanityClient";
import {
  ACTIVE_GALLERY_ITEMS_QUERY,
  mapSanityGalleryItemToLocal,
} from "../lib/sanityQueries";
import { GalleryItem } from "../types/gallery";
import { getGeneralWhatsAppUrl } from "../utils/whatsapp";

export const StoreGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  // ========================================================
  // FETCH GALLERY ITEMS FROM SANITY
  // ========================================================

  useEffect(() => {
    let isMounted = true;

    async function fetchGallery() {
      if (!sanityClient) {
        setIsLoading(false);
        return;
      }

      try {
        const rawData = await sanityClient.fetch(
          ACTIVE_GALLERY_ITEMS_QUERY
        );

        if (isMounted && Array.isArray(rawData)) {
          const mapped = rawData.map(
            mapSanityGalleryItemToLocal
          );

          setItems(
            mapped.filter((item) => item.active)
          );
        }
      } catch (err) {
        console.warn(
          "StoreGallery: Could not fetch gallery items from Sanity",
          err
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  // ========================================================
  // HIDE SECTION WHEN THERE IS NO CONTENT
  // ========================================================

  if (isLoading || items.length === 0) {
    return null;
  }

  const count = items.length;

  return (
    <section
      id="gallery"
      className="py-20 bg-white relative border-b border-soft-border/30 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/10 px-3.5 py-1.5 rounded-full">
            In-Store Gallery
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Our Madurai Store Showcase
          </h2>

          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Take a virtual tour of Singapore Textiles &amp;
            Readymades. We invite you to visit our physical store
            on Mahal Vadampokki Street to experience our
            high-quality fabrics first-hand.
          </p>
        </div>

        {/* ==================================================
            1 GALLERY ITEM
        ================================================== */}

        {count === 1 && (
          <div className="max-w-2xl mx-auto">
            <GalleryCard
              item={items[0]}
              onOpenModal={setSelectedItem}
              isSingle
            />
          </div>
        )}

        {/* ==================================================
            2–3 GALLERY ITEMS
        ================================================== */}

        {(count === 2 || count === 3) && (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              count === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 max-w-4xl mx-auto"
            } gap-6 sm:gap-8`}
          >
            {items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpenModal={setSelectedItem}
              />
            ))}
          </div>
        )}

        {/* ==================================================
            4+ GALLERY ITEMS
        ================================================== */}

        {count >= 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpenModal={setSelectedItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* ====================================================
          LIGHTBOX MODAL
      ==================================================== */}

      {selectedItem && (
        <GalleryLightboxModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

// ==========================================================
// GALLERY CARD
// ==========================================================

interface GalleryCardProps {
  item: GalleryItem;
  onOpenModal: (item: GalleryItem) => void;
  isSingle?: boolean;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  onOpenModal,
  isSingle = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpenModal(item)}
      className="
        group
        flex
        flex-col
        w-full
        text-left
        appearance-none
        rounded-3xl
        overflow-hidden
        border
        border-soft-border/50
        bg-white
        transition-all
        duration-300
        hover:shadow-md
        hover:border-soft-coral/40
        cursor-pointer
        h-full
        focus:outline-none
        focus:ring-2
        focus:ring-soft-coral/50
      "
      aria-label={`View photo: ${item.title}`}
    >
      {/* ====================================================
          IMAGE
      ==================================================== */}

      <div
        className={`overflow-hidden relative bg-light-beige/40 ${
          isSingle
            ? "aspect-[16/9] sm:aspect-[16/10]"
            : "aspect-[4/3]"
        }`}
      >
        {item.imageUrl && !imageError ? (
          <img
            src={item.imageUrl}
            alt={item.title || "Store Gallery Image"}
            loading="lazy"
            onError={() => setImageError(true)}
            className="
              w-full
              h-full
              object-cover
              object-center
              group-hover:scale-105
              transition-transform
              duration-500
              ease-out
            "
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-warm-ivory to-light-beige/60">
            <Camera
              size={36}
              className="text-soft-coral mb-2 opacity-80"
            />

            <span className="font-serif text-sm font-bold text-main-text">
              OPS Singapore Textiles
            </span>
          </div>
        )}

        {/* Hover overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-heading font-semibold flex items-center gap-1.5">
            <ZoomIn size={15} />
            <span>Click to view full photo</span>
          </span>
        </div>

        {/* Category badge */}

        {item.categoryLabel && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-main-text text-[10px] font-heading font-extrabold uppercase tracking-wider shadow-xs border border-white/40">
              {item.categoryLabel}
            </span>
          </div>
        )}
      </div>

      {/* ====================================================
          CARD INFORMATION
      ==================================================== */}

      <div className="p-5 flex-1 flex flex-col justify-between border-t border-soft-border/30 bg-white">
        <div>
          <h3 className="font-heading font-bold text-main-text text-base group-hover:text-soft-coral transition-colors">
            {item.title}
          </h3>

          {item.shortDescription && (
            <p className="text-muted-text text-xs mt-1.5 leading-relaxed line-clamp-2">
              {item.shortDescription}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

// ==========================================================
// GALLERY LIGHTBOX MODAL
// ==========================================================

interface GalleryLightboxModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const GalleryLightboxModal: React.FC<
  GalleryLightboxModalProps
> = ({ item, onClose }) => {
  // Close modal using ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [onClose]);

  // Existing WhatsApp helper
  const waUrl = getGeneralWhatsAppUrl(
    `Hi OPS SINGAPORE TEXTILES, I am inquiring about this showroom/gallery photo: "${item.title}". Please share details.`
  );

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/80
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
        sm:p-6
        animate-fade-in
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="
          relative
          bg-white
          rounded-3xl
          overflow-hidden
          max-w-3xl
          w-full
          max-h-[90vh]
          flex
          flex-col
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================================================
            CLOSE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-20
            bg-black/50
            hover:bg-black
            text-white
            p-2
            rounded-full
            transition-colors
            cursor-pointer
          "
          aria-label="Close photo view"
        >
          <X size={20} />
        </button>

        {/* ==================================================
            LARGE IMAGE
        ================================================== */}

        <div className="relative bg-black flex items-center justify-center min-h-[280px] sm:min-h-[380px] max-h-[60vh] overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[60vh] w-auto object-contain"
            />
          ) : (
            <div className="p-12 text-center text-white/70">
              <ImageIcon
                size={48}
                className="mx-auto mb-2 opacity-50"
              />

              <p>{item.title}</p>
            </div>
          )}
        </div>

        {/* ==================================================
            MODAL CONTENT
        ================================================== */}

        <div className="p-6 bg-white border-t border-soft-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {item.categoryLabel && (
              <span className="text-[10px] font-heading font-extrabold text-soft-coral uppercase tracking-widest">
                {item.categoryLabel}
              </span>
            )}

            <h3 className="font-serif font-bold text-xl text-main-text mt-0.5">
              {item.title}
            </h3>

            {item.shortDescription && (
              <p className="text-muted-text text-sm mt-1 max-w-xl leading-relaxed">
                {item.shortDescription}
              </p>
            )}
          </div>

          {/* WhatsApp inquiry */}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              font-heading
              font-bold
              text-xs
              px-5
              py-3
              rounded-full
              shadow-xs
              transition-all
              flex-shrink-0
              cursor-pointer
            "
          >
            <MessageCircle size={16} />

            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};