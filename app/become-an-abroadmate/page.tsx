import type { Metadata } from "next";
import BecomeAnAbroadmateContent from "@/components/become-an-abroadmate/become-an-abroadmate-content";

// The reference `__PAGE__` is a server component exporting this metadata
// (title renders as "Become a Mentor | AbroadMates"); the interactive content
// lives in the client component below.
export const metadata: Metadata = {
  title: "Become a Mentor",
  description:
    "Turn your study abroad experience into real impact and income. Mentor students one-on-one through AbroadMates.",
};

export default function BecomeAnAbroadmatePage() {
  return <BecomeAnAbroadmateContent />;
}
