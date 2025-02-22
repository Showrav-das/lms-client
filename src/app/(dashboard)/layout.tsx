"use client";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  console.log("role", role);
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    setRole(userRole);
    setUserName(username);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
          <Sidebar
            role={role}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <div className="lg:pl-72">
            <DashboardHeader
              userName={userName ?? ""}
              isProfileMenuOpen={isProfileMenuOpen}
              setIsProfileMenuOpen={setIsProfileMenuOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
