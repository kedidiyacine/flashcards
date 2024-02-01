import { redirect } from "next/navigation";
import { DASHBOARD_PATH } from "./lib/utils";

export default async function Home() {
  redirect(DASHBOARD_PATH);
}
