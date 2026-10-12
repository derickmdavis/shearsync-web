import { DeletionRequestedScreen } from "@/src/components/settings/AccountDeletionFlow";

type DeletionRequestedPageProps = {
  searchParams: Promise<{
    scheduledDeletionAt?: string | string[];
  }>;
};

export default async function DeletionRequestedPage({
  searchParams,
}: DeletionRequestedPageProps) {
  const { scheduledDeletionAt } = await searchParams;

  return (
    <DeletionRequestedScreen
      scheduledDeletionAt={
        typeof scheduledDeletionAt === "string" ? scheduledDeletionAt : null
      }
    />
  );
}
