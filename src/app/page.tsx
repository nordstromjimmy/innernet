import WaitlistForm from "./components/WaitlistForm";
import { ModalProvider } from "./components/ModalImageViewer";
import PreviewImage from "./components/PreviewImage";

export const metadata = {
  title: "Innernetet – Build Your Inner Net",
  description:
    "A quiet, emotionally intelligent space to share your real thoughts and grow your inner world. No followers. No filters. Just you.",
  openGraph: {
    title: "InnerNet – Reflect, Grow, and Evolve",
    description:
      "Explore your thoughts, receive AI reflections, and level up your emotional awareness in a judgment-free space.",
    url: "https://innernetapp.com",
    siteName: "InnerNet",
    images: [
      {
        url: "https://innernetapp.com/og-image.jpg", // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: "InnerNet – Reflective Growth App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InnerNet – Reflect, Grow, and Evolve",
    description:
      "AI reflections for real thoughts. Track your inner growth in a space that's yours alone.",
    images: ["https://innernetapp.com/og-image.jpg"],
  },
};

export default function LandingPage() {
  return (
    <main className="text-gray-800">
      <ModalProvider>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <img src="/logo.png" alt="InnerNet Logo" className="h-64" />
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Welcome to Innernet.
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            A quiet space for your real thoughts — and a mirror to help you
            grow.
          </p>
          <p className="text-gray-500 italic mb-6">
            No likes. No followers. Just you and your inner voice.
          </p>
          <WaitlistForm />

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce text-blue-600 text-3xl">↓</div>
        </section>

        {/* Rest of the page scrolls below */}
        <section className="px-6 py-20 max-w-5xl mx-auto space-y-24">
          {/* Thought */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text */}
            <div className="md:w-1/2">
              <div className="text-4xl mb-4">🌱 </div>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                Share Your Thoughts
              </h2>
              <p className="text-gray-700 mb-3">
                Write what’s really on your mind - no filters, no pressure.
                Whether it's confusion, clarity, emotion, or insight, Innernet
                gives you a space to explore your inner voice privately and
                honestly.
              </p>
              <p className="text-gray-700 mb-4">
                Once posted, our emotionally intelligent AI offers a gentle
                reflection - called an <strong>Echo</strong> - helping you
                understand your thought from a deeper angle. It’s like
                journaling, but with a companion who listens and responds with
                kindness.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <PreviewImage
                src="/thoughts-screen.png"
                alt="InnerNet Thoughts UI"
              />
            </div>
          </div>

          {/* Skill Tree */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            {/* Text */}
            <div className="md:w-1/2">
              <div className="text-4xl mb-4">🌳 </div>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                Grow Your Inner Tree
              </h2>
              <p className="text-gray-700 mb-3">
                Every reflection helps you grow. Innernet tracks your progress
                across emotional and mental skills like{" "}
                <strong>resilience</strong>, <strong>self-worth</strong>,{" "}
                <strong>emotional awareness</strong>, and more.
              </p>
              <p className="text-gray-700 mb-4">
                As you engage, you’ll earn XP and level up your personal{" "}
                <strong>Inner Tree</strong>, unlocking new growth areas over
                time. It’s like an emotional RPG - but the boss is your own
                mind.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <PreviewImage
                src="/profile-screen.png"
                alt="InnerNet Skill Tree UI"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Ready to Go Inward?
            </h2>
            <p className="text-gray-700 mb-6">
              Join the waitlist and be first to know when Innernet launches.
            </p>
            <WaitlistForm />
          </div>
        </section>
      </ModalProvider>
    </main>
  );
}
