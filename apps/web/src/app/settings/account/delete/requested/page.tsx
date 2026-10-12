import { Suspense } from "react";
import { DeletionRequestedScreen } from "@/src/components/settings/AccountDeletionFlow";

export default function DeletionRequestedPage() {
  return (
    <Suspense fallback={null}>
      <DeletionRequestedScreen />
    </Suspense>
  );
}
