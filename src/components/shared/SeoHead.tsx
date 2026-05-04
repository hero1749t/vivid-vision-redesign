import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const SeoHead = () => {
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ["seo", pathname],
    queryFn: async () => {
      const { data } = await supabase
        .from("seo_pages")
        .select("*")
        .eq("path", pathname)
        .maybeSingle();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;
    document.title = data.title;
    setMeta('meta[name="description"]', "content", data.description);
    if (data.keywords) setMeta('meta[name="keywords"]', "content", data.keywords);
    setMeta('meta[property="og:title"]', "content", data.title);
    setMeta('meta[property="og:description"]', "content", data.description);
    setMeta('meta[property="og:url"]', "content", window.location.href);
    if (data.og_image) setMeta('meta[property="og:image"]', "content", data.og_image);
    setMeta(
      'meta[name="robots"]',
      "content",
      data.noindex ? "noindex, nofollow" : "index, follow"
    );
    setLink("canonical", data.canonical || window.location.origin + pathname);
  }, [data, pathname]);

  return null;
};
