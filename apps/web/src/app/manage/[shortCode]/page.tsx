import { ShortCodeManageAppointmentClient } from "@/src/components/appointments/ShortCodeManageAppointmentClient";

type ManageAppointmentPageProps = {
  params: Promise<{
    shortCode: string;
  }>;
};

export default async function ManageAppointmentPage(
  props: ManageAppointmentPageProps,
) {
  const { shortCode } = await props.params;

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[430px]">
        <ShortCodeManageAppointmentClient shortCode={shortCode} />
      </div>
    </main>
  );
}
