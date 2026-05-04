-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Admins read roles" ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- SEO pages
CREATE TABLE public.seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  keywords text,
  og_image text,
  canonical text,
  sitemap_priority numeric NOT NULL DEFAULT 0.7,
  sitemap_changefreq text NOT NULL DEFAULT 'monthly',
  include_in_sitemap boolean NOT NULL DEFAULT true,
  noindex boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read seo" ON public.seo_pages FOR SELECT USING (true);
CREATE POLICY "Admins write seo" ON public.seo_pages FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER seo_pages_touch BEFORE UPDATE ON public.seo_pages
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.seo_pages (path, title, description, keywords, sitemap_priority, sitemap_changefreq) VALUES
('/', 'Bali YTTC – Yoga Teacher Training in Ubud, Bali · 100/200/300 Hour YTT', 'Yoga Alliance certified Hatha, Ashtanga & Vinyasa Yoga Teacher Training in Ubud, Bali. 100hr, 200hr & 300hr immersions with senior teachers since 2018.', 'yoga teacher training bali, ubud yoga, 200 hour ytt, yoga alliance', 1.0, 'weekly'),
('/courses/100hr', '100 Hour Yoga Teacher Training in Bali · Bali YTTC', 'An 11-day Multi-style Yoga Teacher Training course in Ubud, Bali — perfect first immersion. Yoga Alliance accredited.', '100 hour ytt bali, beginner yoga ttc', 0.9, 'monthly'),
('/courses/200hr', '200 Hour Yoga Teacher Training in Bali · Bali YTTC', 'Flagship 21-day Hatha, Ashtanga & Vinyasa 200-hour YTT in Ubud. Become a Yoga Alliance certified teacher.', '200 hour ytt bali, yoga teacher training', 0.9, 'monthly'),
('/courses/300hr', '300 Hour Advanced Yoga Teacher Training in Bali · Bali YTTC', '28-day advanced 300-hour YTT for certified teachers. Deepen your practice and teaching in Ubud, Bali.', '300 hour ytt bali, advanced yoga ttc', 0.9, 'monthly'),
('/about', 'About Bali YTTC · Yoga School in Ubud since 2018', 'Learn about Bali Yoga Teacher Training Center — our lineage, teachers and the Ubud ashram.', 'about bali yttc, ubud yoga school', 0.7, 'monthly'),
('/instructors', 'Our Yoga Teachers · Bali YTTC', 'Meet our senior Yoga Alliance certified teachers leading the trainings in Ubud, Bali.', 'yoga teachers bali, vivek kalura', 0.7, 'monthly'),
('/gallery', 'Gallery · Bali YTTC Ubud', 'Photos from our yoga teacher trainings, ceremonies and daily life in Ubud, Bali.', 'bali yttc gallery', 0.6, 'monthly'),
('/contact', 'Contact Bali YTTC · Ubud, Bali', 'Get in touch about our 100/200/300 hour yoga teacher trainings in Ubud, Bali.', 'contact bali yttc', 0.6, 'monthly');