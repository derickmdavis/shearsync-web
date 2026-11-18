import { MessagesScreen } from "@/src/components/workspace/MessagesScreen";

type MessagesPageProps = { searchParams: Promise<{ tab?: string | string[]; focus?: string | string[] }> };

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const query = await searchParams;
  const tab = query.tab === "manage" || query.tab === "scheduled" || query.tab === "sent" ? query.tab : "scheduled";
  return <MessagesScreen initialTab={tab} focusWaitlist={tab === "manage" && query.focus === "waitlist"} />;
}
