import { PasswordRecoveryScreen } from "@/src/components/auth/PasswordRecoveryScreen";

// This is a public route. It starts a recovery request but never processes a
// signed-in application session.
export default function ForgotPasswordPage() {
  return <PasswordRecoveryScreen mode="forgot" />;
}
