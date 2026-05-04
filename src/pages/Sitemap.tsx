import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  useEffect(() => {
    (async () => {
      const origin = window.location.origin;
      const { data } = await supabase
        .from("seo_pages")
        .select("path,sitemap_priority,sitemap_changefreq,updated_at,include_in_sitemap,noindex")
        .eq("include_in_sitemap", true)
        .eq("noindex", false);

      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        (data ?? [])
          .map((p) =>
            `  <url>\n    <loc>${origin}${p.path}</loc>\n    <lastmod>${new Date(p.updated_at).toISOString().split("T")[0]}</lastmod>\n    <changefreq>${p.sitemap_changefreq}</changefreq>\n    <priority>${p.sitemap_priority}</priority>\n  </url>`
          )
          .join("\n") +
        `\n</urlset>`;

      document.open();
      document.write(`<pre style="white-space:pre-wrap;font-family:monospace;font-size:12px">${xml.replace(/</g,"&lt;")}</pre>`);
      document.close();
    })();
  }, []);
  return null;
};

export default Sitemap;
