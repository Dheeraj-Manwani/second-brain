import { QueryParams } from "@/actions/types";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Layout({
  children,
  modal,
  searchParams,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  searchParams: QueryParams;
}) {
  return (
    <ContentLayout title="My Resources" searchParams={searchParams}>
      {/* <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Dashboard</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb> */}
      <Card className="rounded-lg border-none bg-[--light-cream] shadow-inner min-h-[85vh]">
        <CardContent className="min-h-[85vh]">
          <div className="flex w-full min-h-[82vh] justify-start items-start">
            {children}
          </div>
        </CardContent>
      </Card>
      {modal}
    </ContentLayout>
  );
}
