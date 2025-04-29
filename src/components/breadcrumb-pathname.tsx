"use client";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/helpers/format-pathname";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";

export const BreadcrumbPathname = () => {
  const pathname = usePathname();
  const breadcrumbItems = formatPathname(pathname);
  return (
    <Breadcrumb className="font-semibold">
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};
