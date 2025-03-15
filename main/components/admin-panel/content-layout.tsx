import { QueryParams } from "@/actions/types";
import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  searchParams: QueryParams;
}

export function ContentLayout({
  title,
  children,
  searchParams,
}: ContentLayoutProps) {
  // console.log(searchParams);
  return (
    <div>
      <Navbar title={title} />
      <div className="pt-6 pb-6 px-4 sm:px-6">{children}</div>
    </div>
  );
}
