import type { PublicStylist } from "@/src/lib/api";

type PublicBookingProfileProps = {
  stylist: PublicStylist;
};

function formatInstagramHandle(value?: string | null) {
  if (!value) return null;
  return `@${value.replace(/^@+/, "")}`;
}

function getInstagramUrl(value?: string | null) {
  if (!value) return null;
  return `https://instagram.com/${value.replace(/^@+/, "")}`;
}

export function PublicBookingProfile({ stylist }: PublicBookingProfileProps) {
  const instagramHandle = formatInstagramHandle(stylist.instagram);
  const instagramUrl = getInstagramUrl(stylist.instagram);

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      {stylist.cover_photo_url ? (
        <div
          className="-mx-6 -mt-6 mb-5 h-28 rounded-t-[30px] bg-zinc-100 bg-cover bg-center sm:-mx-8 sm:-mt-8 lg:mx-0 lg:mt-0 lg:h-48 lg:rounded-3xl"
          style={{ backgroundImage: `url(${stylist.cover_photo_url})` }}
        />
      ) : null}

      <div>
        <p className="font-display text-4xl font-semibold italic text-foreground">
          {stylist.display_name}
        </p>
        {stylist.business_name || instagramHandle ? (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {stylist.business_name ? (
              <p className="text-muted">{stylist.business_name}</p>
            ) : null}
            {instagramHandle && instagramUrl ? (
              <a
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-muted"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                {instagramHandle}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {stylist.bio ? (
        <p className="mt-5 rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-muted">
          {stylist.bio}
        </p>
      ) : null}
    </aside>
  );
}
