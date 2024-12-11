import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Graphix: Your Creative Playground",
  description: "Graphix is a cutting-edge online design platform that empowers creators to design stunning visuals with ease. Whether you're crafting social media posts, marketing materials, or custom graphics, Graphix offers an intuitive drag-and-drop interface, professionally designed templates, and powerful editing tools. Perfect for both beginners and professionals, it elevates your design game with customizable elements, fonts, and high-quality assets—all in one place. Start creating effortlessly with Graphix today and turn your ideas into eye-catching masterpieces!",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png'
  }
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}