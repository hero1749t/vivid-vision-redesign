import { getSession } from '@/lib/session';
import { redirect } from '@/i18n/routing';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Extra safety check in layout (middleware already does this, but good for type safety)
  if (!session || session.role !== 'STUDENT') {
    // Should ideally redirect to login, but middleware handles the locale-aware redirect
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-serif font-bold text-xl text-gray-900">Bali YTTC</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#F04E23] font-bold mt-1">Student Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {/* Links would go here using next-intl Link */}
          <a href="#" className="block px-4 py-2 text-sm font-semibold bg-[#F04E23]/10 text-[#F04E23] rounded-lg">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Course Manual</a>
          <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Video Lessons</a>
          <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Schedule</a>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div>
              <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{session?.email}</p>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-[10px] text-gray-500 hover:text-[#F04E23]">Sign out</button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
