import { Outfit } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/lib/Context/SessionContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Updated import path
import { AuthOptions } from "next-auth"; // Explicitly import AuthOptions type

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Explicitly type authOptions as AuthOptions to ensure compatibility
  const session = await getServerSession(authOptions as AuthOptions);
  console.log(session);

  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}