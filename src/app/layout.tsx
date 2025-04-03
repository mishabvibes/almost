// src/app/layout.tsx
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ClientSessionProvider from "@/lib/ClientSessionProvider";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "@/context/LoadingContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "AIC Alumni - Donation Platform",
  description: "Support AIC Alumni initiatives through donations and volunteering.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ClientSessionProvider session={session}>
          <LoadingProvider>
            {children}
          </LoadingProvider>      
        </ClientSessionProvider>
      </body>
    </html>
  );
}