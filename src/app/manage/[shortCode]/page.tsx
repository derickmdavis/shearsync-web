import { ManageAppointmentClient } from "@/src/components/appointments/ManageAppointmentClient";

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
        <ManageAppointmentClient token={shortCode} source="short-code" />
      </div>
    </main>
  );
}
