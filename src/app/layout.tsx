import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import { AuthProvider } from "@/components/hackup/providers/auth-provider";
import { Inter, Roboto, Ruslan_Display, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const ruslan = Ruslan_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ruslan",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "VibeX",
  description: "Your central hub for innovation, connection, and challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-inter: ${inter.style.fontFamily};
                --font-roboto: ${roboto.style.fontFamily};
                --font-ruslan: ${ruslan.style.fontFamily};
                --font-poppins: ${poppins.style.fontFamily};
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "font-body antialiased min-h-screen flex flex-col p-4 md:p-6",
          inter.variable,
          roboto.variable,
          ruslan.variable,
          poppins.variable
        )}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col mt-24">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
