import { PasswordRecoveryScreen } from "@/src/components/auth/PasswordRecoveryScreen";

// This public route is the canonical Supabase recovery callback and must be
// served directly by the production host on hard refreshes as well.
export default function ResetPasswordPage() {
  return <PasswordRecoveryScreen />;
}
