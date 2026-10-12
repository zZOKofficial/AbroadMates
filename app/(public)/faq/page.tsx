import FaqAccordion from "@/components/faq/faq-accordion";

// Reference page chunk exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

export default function FaqPage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <FaqAccordion />
      </div>
    </div>
  );
}
