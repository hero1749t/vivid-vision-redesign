import { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity";

interface BalieytcLogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const BalieytcLogo = ({
  className = "h-12 w-12",
  showText = true,
  textClassName = "",
}: BalieytcLogoProps) => {
  const [logoUrl, setLogoUrl] = useState("/logo-512.png");
  const [siteName, setSiteName] = useState("Bali YTTC");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(`*[_type == "settings"][0]{logo, siteName}`);
        if (data) {
          if (data.logo) setLogoUrl(urlFor(data.logo).url());
          if (data.siteName) setSiteName(data.siteName);
        }
      } catch (err) {
        console.error("Logo settings fetch error:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <img
        src={logoUrl}
        alt={`${siteName} logo`}
        className={`${className} rounded-sm object-cover shadow-sm`}
        loading="eager"
        decoding="async"
      />

      {showText && (
        <div className={`leading-tight ${textClassName}`}>
          <p className="font-serif text-lg font-bold text-current">{siteName}</p>
          <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-current/70">
            Yoga Teacher Training
          </p>
        </div>
      )}
    </div>
  );
};

export default BalieytcLogo;
