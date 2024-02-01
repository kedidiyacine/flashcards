import { type PropsWithChildren } from "react";
import Aside from "../components/dashboard/aside-dashboard";
import Header from "../components/dashboard/header";

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <Aside />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
