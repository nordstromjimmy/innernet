export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 mt-24 py-6 text-center text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} innernet. All rights reserved.</p>

        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="mailto:nordstromjimmy@gmail.com" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
