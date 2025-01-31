import Link from "next/link";

export function Nav() {
  return (
    <nav className="bg-white shadow font-inter fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link title="home" href="/" className="font-cairo font-bold text-xl">
            Stop ✋ Complete ✅
          </Link>
          <div className="flex items-center lg:gap-1 gap-2">
            {/* <ProfileMenu /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
