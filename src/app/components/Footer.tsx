export default function Footer() {
  return (
    <footer className=" py-6 mt-4 text-center">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>
          &copy; {new Date().getFullYear()} innernetapp.com | All rights
          reserved.
        </p>

        <div className="flex gap-2">
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
