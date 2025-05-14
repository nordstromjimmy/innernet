export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Terms Of Service
        </h1>
        <p className="mb-4">
          By using InnerNet, you agree to the following terms. We keep things
          simple because this is a space for reflection, not fine print.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          1. Your Content
        </h2>
        <p className="mb-4">
          You own your thoughts. Anything you write is yours. By posting, you
          give us permission to store and analyze it to provide AI responses and
          personalized growth features.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          2. Respect & Safety
        </h2>
        <p className="mb-4">
          InnerNet is not a public social platform. Still, please don’t use it
          to post harmful or illegal content. We reserve the right to suspend
          accounts that violate this spirit.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          3. Availability
        </h2>
        <p className="mb-4">
          We’re always improving InnerNet, which means things may change or go
          offline briefly. We’ll do our best to keep things smooth and safe.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
          4. Contact
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
