import Image from "next/image";

interface ProjectImageProps {
  alt: string;
  priority?: boolean;
  className?: string;
}

// Placeholder image as data URI
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'%3E%3Crect fill='%232563eb' width='1200' height='600'/%3E%3Ctext x='50%' y='50%' font-size='48' fill='white' text-anchor='middle' dominant-baseline='middle'%3EProject Image%3C/text%3E%3C/svg%3E";

export function ProjectImage({
  alt,
  priority = false,
  className = "w-full h-96 object-cover rounded-lg",
}: ProjectImageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        width={1200}
        height={600}
        priority={priority}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        className={className}
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%232563eb' width='100' height='50'/%3E%3C/svg%3E"
      />
    </div>
  );
}

export function CardThumbnail({
  alt,
  className = "w-full h-40 object-cover",
}: Omit<ProjectImageProps, "priority">) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
      <Image
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        width={600}
        height={300}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%232563eb' width='100' height='50'/%3E%3C/svg%3E"
      />
    </div>
  );
}
