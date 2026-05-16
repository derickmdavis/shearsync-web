import { LoginScreen } from "@/src/components/auth/LoginScreen";

type LoginPageProps = {
  searchParams: Promise<{
    mode?: string;
    next?: string;
  }>;
};

function getAuthMode(mode?: string) {
  if (mode === "sign-up" || mode === "reset" || mode === "update-password") {
    return mode;
  }

  return "sign-in";
}

function getSafeNextPath(next?: string) {
  // Prevent open redirects by allowing only same-origin relative paths.
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/account";
  }

  return next;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <LoginScreen
      initialMode={getAuthMode(params.mode)}
      nextPath={getSafeNextPath(params.next)}
    />
  );
}
