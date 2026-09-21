import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-4 text-center font-sans">
        <h1 className="text-4xl font-bold text-[#1a1a1a]">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page introuvable / Page not found</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#ef5d36] px-8 py-3 font-bold text-[#1a1a1a]"
        >
          Retour à l&apos;accueil / Back to Home
        </Link>
      </body>
    </html>
  );
}
