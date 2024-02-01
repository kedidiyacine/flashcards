import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Category } from "@prisma/client";
import Link from "next/link";
import { CreateDeck } from "./decks/creation-form/create-form";

const getCategories = async (): Promise<Category[]> => {
  return await api.category.getAll.query();
};

export default async function Header() {
  const session = await getServerAuthSession();
  const categories: Awaited<Category[]> = await getCategories();

  return (
    <header>
      <CreateDeck categories={categories} />
      <Link
        href={session ? "/api/auth/signout" : "/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </header>
  );
}
