import Navbar from "./_components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Rental System",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}  overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
