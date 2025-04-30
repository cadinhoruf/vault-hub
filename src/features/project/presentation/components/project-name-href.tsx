"use client";

import Link from "next/link";

export function ProjectNameLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {name}
    </Link>
  );
}
