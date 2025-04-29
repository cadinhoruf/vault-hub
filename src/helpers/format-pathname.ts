import { navData } from "@/components/nav-data";

export const formatPathname = (pathname: string) => {
  const pathnameList = navData.filter((item) =>
    item.items.some((item) => item.url === pathname)
  );
  const item = pathnameList.map(
    (item) => item.items.find((item) => item.url === pathname)?.title
  );
  return item;
};
