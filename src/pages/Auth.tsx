import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";

const Auth = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/admin");
    });
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "Check your inbox to confirm your email." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav("/admin");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-sand px-4 py-16">
      <div className="w-full max-w-md bg-cream rounded-2xl shadow-elev-lg p-8 md:p-10">
        <div className="flex items-center gap-2 text-terra mb-6">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Admin Access</span>
        </div>
        <h1 className="font-serif text-3xl text-warm-dark mb-2">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-sm text-ink-soft mb-8">Sign in to manage SEO and site content.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-terra hover:bg-terra-deep text-cream h-11">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-ink-soft">
          {mode === "login" ? (
            <>No account? <button onClick={() => setMode("signup")} className="text-terra font-medium hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")} className="text-terra font-medium hover:underline">Sign in</button></>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-warm-light hover:text-terra">← Back to site</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
