// src/app/campaigns/components/Header.tsx
import Link from "next/link";

export function Header() {
  return (
    <section className="pt-32 pb-12 px-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Our Campaigns</h1>
        <p className="text-xl text-indigo-200 max-w-3xl">
          Join us in making a difference - every contribution creates meaningful impact in our community.
        </p>
      </div>
    </section>
  );
}