export default function PrivacyPolicy() {
  return (
    <main className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Privacy Policy
        </h1>
        <p className="mb-4">
          Innernet is designed to be a private and thoughtful space. We respect
          your privacy and only collect what’s necessary to make the app work
          well for you.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          What We Collect
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Your email address (for login and waitlist, if applicable)</li>
          <li>Your written thoughts and reflections</li>
          <li>Optional profile settings (name, gender)</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          How We Use It
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To personalize your experience</li>
          <li>To generate helpful AI reflections</li>
          <li>To support your growth journey over time</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          Data Privacy
        </h2>
        <p className="mb-4">
          Your thoughts are stored securely and are never shared with others. We
          do not use your data for advertising or sell your information. We may
          analyze aggregated, anonymized usage to improve the app.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          Contact
        </h2>
        <p>
          Questions?{" "}
          <a
            href="mailto:nordstromjimmy@gmail.com"
            className="text-blue-600 hover:underline"
          >
            Reach out{" "}
          </a>
          to us anytime
        </p>
      </div>
    </main>
  );
}
