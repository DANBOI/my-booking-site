import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import SignupModal from "@/components/modals/SignupModal";
import Notification from "@/components/Notification";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "My booking site",
  description: "Boarding,ladging and renting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Notification />
        <SignupModal />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
