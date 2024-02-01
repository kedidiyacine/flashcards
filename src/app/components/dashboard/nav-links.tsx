"use client";

import { Clock, HeartIcon, SettingsIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

type LinkPaths = "recents" | "favorites" | "settings";

type L = {
  description: string;
  icon: LucideIcon;
};

type UniqueLinks = { [K in LinkPaths]: L & { id: string } };

const links: UniqueLinks = {
  recents: {
    id: "recents",
    description: "contains a list of recently visited decks of flashcards.",
    icon: Clock,
  },
  favorites: {
    id: "favorites",
    description: "contains a list of your favorite decks of flashcards.",
    icon: HeartIcon,
  },
  settings: {
    id: "settings",
    description: "contains settings for your user account.",
    icon: SettingsIcon,
  },
};

export default function NavLinks() {
  const pathname = usePathname();

  return Object.keys(links).map((name) => {
    const link = links[name as keyof UniqueLinks];

    return (
      <li key={link.id}>
        <Link
          href={`/dashboard/${name}`}
          className={cn(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-blue-600 shadow-sm":
                `/dashboard/${name}` === pathname,
            },
          )}
        >
          <link.icon />
          <p>{name}</p>
        </Link>
      </li>
    );
  });
}
