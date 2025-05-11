import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-5xl mx-auto mb-8 flex justify-between items-center">
      <div>
        <Link className="text-3xl font-bold text-blue-900" href="/home">
          Innernet
        </Link>
        <p className="text-sm text-gray-600">
          Welcome back. Share what’s on your mind.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline font-medium"
        >
          Blog
        </Link>
        <Link
          href="/livefeed"
          className="text-blue-600 hover:underline font-medium"
        >
          Live Feeds
        </Link>
        <Link
          href="/profile"
          className="text-blue-600 hover:underline font-medium"
        >
          View Profile
        </Link>
      </div>
    </header>
  );
}
