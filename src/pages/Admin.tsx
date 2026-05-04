import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, LogOut, Save, ShieldAlert, Plus, Trash2, ExternalLink, FileText } from "lucide-react";

type Page = {
  id: string; path: string; title: string; description: string;
  keywords: string | null; og_image: string | null; canonical: string | null;
  sitemap_priority: number; sitemap_changefreq: string;
  include_in_sitemap: boolean; noindex: boolean;
};

const Admin = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [pages, setPages] = useState<Page[]>([]);
  const [active, setActive] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [grantingSelf, setGrantingSelf] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) nav("/auth");
    });
    init();
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { nav("/auth"); return; }
    setUserId(session.user.id);
    setEmail(session.user.email ?? "");
    const { data: roles } = await supabase
      .from("user_roles").select("role").eq("user_id", session.user.id);
    const admin = !!roles?.some((r) => r.role === "admin");
    setIsAdmin(admin);
    if (admin) await loadPages();
    setLoading(false);
  };

  const loadPages = async () => {
    const { data, error } = await supabase.from("seo_pages").select("*").order("path");
    if (error) toast({ title: "Load failed", description: error.message, variant: "destructive" });
    else setPages((data ?? []) as Page[]);
  };

  const grantSelfAdmin = async () => {
    if (!userId) return;
    setGrantingSelf(true);
    const { count } = await supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) > 0) {
      toast({ title: "Bootstrap blocked", description: "An admin already exists.", variant: "destructive" });
      setGrantingSelf(false); return;
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "You are now admin ✦" }); setIsAdmin(true); await loadPages(); }
    setGrantingSelf(false);
  };

  const save = async () => {
    if (!active) return;
    setSaving(true);
    const { id, ...patch } = active;
    const { error } = await supabase.from("seo_pages").update(patch).eq("id", id);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved ✦", description: `${active.path} updated` }); await loadPages(); }
    setSaving(false);
  };

  const createPage = async () => {
    const path = prompt("New page path (e.g. /retreats)");
    if (!path) return;
    const { error } = await supabase.from("seo_pages").insert({
      path, title: "New page", description: "Edit this description.",
    });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Page created" }); await loadPages(); }
  };

  const remove = async (p: Page) => {
    if (!confirm(`Delete SEO entry for ${p.path}?`)) return;
    const { error } = await supabase.from("seo_pages").delete().eq("id", p.id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); setActive(null); await loadPages(); }
  };

  const logout = async () => { await supabase.auth.signOut(); nav("/auth"); };

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-sand"><Loader2 className="w-6 h-6 animate-spin text-terra" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-sand p-4">
        <div className="max-w-md w-full bg-cream rounded-2xl p-8 text-center shadow-elev-md">
          <ShieldAlert className="w-10 h-10 text-terra mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-warm-dark mb-2">Admin access required</h1>
          <p className="text-sm text-ink-soft mb-6">
            Signed in as <strong>{email}</strong>, but you don't have admin role yet.
            <br />If you are the first user, click below to claim admin.
          </p>
          <Button onClick={grantSelfAdmin} disabled={grantingSelf} className="bg-terra hover:bg-terra-deep text-cream w-full">
            {grantingSelf && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Claim admin (first user only)
          </Button>
          <button onClick={logout} className="mt-4 text-xs text-warm-light hover:text-terra">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-cream border-b border-warm-dark/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-serif text-xl text-warm-dark">Bali YTTC</Link>
          <span className="text-[10px] tracking-[0.25em] uppercase text-warm-light">Admin · SEO</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/sitemap.xml" target="_blank" className="text-xs text-ink-soft hover:text-terra inline-flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> sitemap.xml <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-xs text-ink-soft hidden md:inline">{email}</span>
          <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0">
        <aside className="bg-cream lg:min-h-[calc(100vh-65px)] border-r border-warm-dark/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-[0.25em] uppercase text-warm-light">Pages</p>
            <button onClick={createPage} className="text-terra hover:bg-terra/10 p-1 rounded" title="Add page">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {pages.map((p) => (
              <button key={p.id} onClick={() => setActive(p)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  active?.id === p.id ? "bg-terra/10 text-terra" : "text-warm-mid hover:bg-sand"
                }`}>
                <p className="font-medium truncate">{p.path}</p>
                <p className="text-[11px] text-ink-muted truncate">{p.title}</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="p-6 md:p-10">
          {!active ? (
            <div className="text-center text-ink-soft py-32">
              <FileText className="w-10 h-10 mx-auto mb-3 text-warm-light" />
              <p>Select a page to edit its SEO content.</p>
            </div>
          ) : (
            <div className="max-w-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-warm-dark">Edit: {active.path}</h2>
                <Button variant="ghost" size="sm" onClick={() => remove(active)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <Label>Page path</Label>
                <Input value={active.path} onChange={(e) => setActive({ ...active, path: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Title <span className="text-xs text-ink-muted">(under 60 chars)</span></Label>
                <Input value={active.title} maxLength={70} onChange={(e) => setActive({ ...active, title: e.target.value })} className="mt-1.5" />
                <p className="text-[11px] text-ink-muted mt-1">{active.title.length} chars</p>
              </div>
              <div>
                <Label>Meta description <span className="text-xs text-ink-muted">(under 160 chars)</span></Label>
                <Textarea value={active.description} maxLength={200} rows={3} onChange={(e) => setActive({ ...active, description: e.target.value })} className="mt-1.5" />
                <p className="text-[11px] text-ink-muted mt-1">{active.description.length} chars</p>
              </div>
              <div>
                <Label>Keywords (comma separated)</Label>
                <Input value={active.keywords ?? ""} onChange={(e) => setActive({ ...active, keywords: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>OG Image URL</Label>
                <Input value={active.og_image ?? ""} placeholder="https://..." onChange={(e) => setActive({ ...active, og_image: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Canonical URL (optional)</Label>
                <Input value={active.canonical ?? ""} onChange={(e) => setActive({ ...active, canonical: e.target.value })} className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sitemap priority</Label>
                  <Input type="number" step="0.1" min="0" max="1" value={active.sitemap_priority}
                    onChange={(e) => setActive({ ...active, sitemap_priority: Number(e.target.value) })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Change frequency</Label>
                  <select value={active.sitemap_changefreq}
                    onChange={(e) => setActive({ ...active, sitemap_changefreq: e.target.value })}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                    {["always","hourly","daily","weekly","monthly","yearly","never"].map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-warm-dark/10 p-4 bg-cream">
                <div>
                  <p className="text-sm font-medium text-warm-dark">Include in sitemap</p>
                  <p className="text-xs text-ink-muted">Show this page in /sitemap.xml</p>
                </div>
                <Switch checked={active.include_in_sitemap}
                  onCheckedChange={(v) => setActive({ ...active, include_in_sitemap: v })} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-warm-dark/10 p-4 bg-cream">
                <div>
                  <p className="text-sm font-medium text-warm-dark">No-index this page</p>
                  <p className="text-xs text-ink-muted">Hide from Google search results</p>
                </div>
                <Switch checked={active.noindex}
                  onCheckedChange={(v) => setActive({ ...active, noindex: v })} />
              </div>
              <div className="pt-2 flex gap-3">
                <Button onClick={save} disabled={saving} className="bg-terra hover:bg-terra-deep text-cream">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save changes
                </Button>
                <Link to={active.path} target="_blank">
                  <Button variant="outline">Preview <ExternalLink className="w-3.5 h-3.5 ml-2" /></Button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
