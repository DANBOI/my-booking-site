import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import SignupModal from "@/components/modals/SignupModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import Notification from "@/components/Notification";
import getCurrentUser from "@/utils/getCurrentUser";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "My booking site",
  description: "Boarding,ladging and renting",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <SignupModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <main>{children}</main>
        <Notification />
      </body>
    </html>
  );
}
