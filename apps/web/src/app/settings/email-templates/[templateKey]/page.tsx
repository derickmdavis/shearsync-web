import { notFound } from "next/navigation";
import { EmailTemplateEditorScreen } from "@/src/components/settings/EmailTemplateEditorScreen";
import type { EmailTemplateKey } from "@/src/lib/api";

const templateKeys = new Set<EmailTemplateKey>(["booking_confirmation", "appointment_reminder", "rebook_nudge", "thank_you", "birthday"]);

export default async function EmailTemplatePage({ params }: { params: Promise<{ templateKey: string }> }) {
  const { templateKey } = await params;
  if (!templateKeys.has(templateKey as EmailTemplateKey)) notFound();
  return <EmailTemplateEditorScreen templateKey={templateKey as EmailTemplateKey} />;
}
