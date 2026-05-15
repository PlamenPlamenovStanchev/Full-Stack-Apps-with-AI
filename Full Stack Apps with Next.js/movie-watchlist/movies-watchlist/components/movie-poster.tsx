import Image from "next/image";

type MoviePosterProps = {
  alt: string;
  className?: string;
  posterUrl: string;
  priority?: boolean;
  sizes?: string;
};

export function MoviePoster({
  alt,
  className = "",
  posterUrl,
  priority = false,
  sizes = "(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 220px",
}: MoviePosterProps) {
  return (
    <div className={`poster-frame ${className}`}>
      <Image
        alt={alt}
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
        fill
        loading={priority ? undefined : "lazy"}
        priority={priority}
        quality={82}
        sizes={sizes}
        src={posterUrl}
      />
    </div>
  );
}
