import "./globals.css";
import type { Metadata } from "next";
import { UserProfileProvider } from "./context/UserProfileContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="innernetapp.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="canonical" href="https://innernetapp.com/" />

      <meta name="robots" content="index, follow" />
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-100 text-gray-800">
        <main className="flex-grow">
          <Toaster position="top-center" />
          <UserProfileProvider>{children}</UserProfileProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
