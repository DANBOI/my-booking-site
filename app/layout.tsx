import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "My booking site",
  description: "My booking site for boarding and ladging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
