import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MentorList from "@/components/services/mentor-list";
import { getService } from "@/data/services";

/**
 * `/services/[service]` - rebuilt from the original
 * `app/(public)/services/[service]/page.tsx`.
 *
 * The six blueprint files the scraper captured for this route are 404s (the
 * slugs it knew about had been retired), so the page body follows the live
 * route's structure: a server page that renders the shared mentor list
 * (module 22066) in `service` mode with the page copy passed as flight props,
 * exactly like the surviving scholarship / study-in renders.
 */

type ServiceParams = { params: Promise<{ service: string }> };

export async function generateMetadata({
  params,
}: ServiceParams): Promise<Metadata> {
  const { service } = await params;
  const entry = getService(service);
  if (!entry) return { title: "Service not found" };
  return {
    title: `${entry.title} Mentors`,
    description: `Find AbroadMates mentors who can help with ${service.replace(
      /-/g,
      " ",
    )} for your study abroad journey.`,
  };
}

export default async function ServicePage({ params }: ServiceParams) {
  const { service } = await params;
  const entry = getService(service);
  if (!entry) notFound();

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <MentorList
          mode="service"
          lockedService={entry.title}
          pageSubheading={entry.subheading}
          emptyStateMessage={entry.emptyStateMessage}
        />
      </div>
    </div>
  );
}
