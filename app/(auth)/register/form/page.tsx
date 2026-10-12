import { Suspense } from "react";

import { RegisterWizard } from "@/components/auth/register-wizard";

// Rebuilt from the original site's /register/form page (chunks 3589/1206, module 22935).
// The original also had app/(auth)/register/form/layout.tsx (module 50051) with the sticky
// progress header; layout.tsx is not part of this rebuild, so the header lives inside
// RegisterWizard. useSearchParams() needs a Suspense boundary in the App Router.
export default function RegisterFormPage() {
  return (
    <Suspense>
      <RegisterWizard />
    </Suspense>
  );
}
