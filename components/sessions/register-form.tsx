"use client";

// NOTE: backend endpoint was lost with the original site - wire to your API

const STAGE_OPTIONS = [
  { value: "applying_this_year", label: "Currently applying this year" },
  { value: "planning_next_year", label: "Planning to apply next year" },
  { value: "application_in_progress", label: "Already have an application in progress" },
];

const LEVEL_OPTIONS = ["Bachelor's", "Master's", "PhD", "Diploma"];

const CONTACT_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
];

const OPTION_LABEL_CLASS =
  "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-2.5 py-2 text-xs font-medium leading-snug transition sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm border-black/10 bg-white text-text-primary hover:border-black/20";
const RADIO_CLASS = "sr-only";
const RADIO_MARK_CLASS =
  "pointer-events-none grid h-4 w-4 shrink-0 place-items-center rounded-full border border-black/30";
const INPUT_CLASS =
  "min-h-11 w-full rounded-xl border border-black/10 bg-gray-light px-3 py-2.5 text-sm text-text-primary placeholder:text-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const COUNTRY_BUTTON_CLASS =
  "inline-flex min-w-0 items-center gap-1.5 text-left h-11 w-[7.5rem] rounded-xl border border-black/10 bg-gray-light px-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-34";

function CountryCodeButton() {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Country code"
        aria-expanded="false"
        aria-haspopup="listbox"
        className={COUNTRY_BUTTON_CLASS}
      >
        <span
          className="fi fi-bd inline-block shrink-0 overflow-hidden rounded-xs align-middle aspect-4/3 !bg-cover !bg-center !leading-none before:!hidden h-3.5 w-5"
          aria-hidden={false}
          aria-label="Bangladesh"
          title="Bangladesh"
          role="img"
        />
        <span className="min-w-0 truncate font-medium">+880</span>
        <span />
      </button>
    </div>
  );
}

export function RegisterForm({ price }: { price: string }) {
  return (
    <form
      className="flex w-full flex-col gap-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:gap-6 sm:p-6 lg:p-8"
      noValidate
    >
      <div>
        <h2 className="font-brand text-base font-bold leading-snug text-text-primary sm:text-lg lg:text-xl">
          Complete your registration
        </h2>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-fullName" className="text-sm font-semibold text-text-primary">
          Full name<span className="text-error"> *</span>
        </label>
        <input
          id="reg-fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="Enter your full name"
          className={INPUT_CLASS}
          name="fullName"
        />
      </div>

      <fieldset className="mb-3 flex flex-col pb-1">
        <legend className="text-sm font-semibold text-text-primary mb-2.5">
          When are you applying?<span className="text-error"> *</span>
        </legend>
        <div className="flex flex-col gap-2">
          {STAGE_OPTIONS.map((opt) => (
            <label key={opt.value} className={OPTION_LABEL_CLASS}>
              <input type="radio" className={RADIO_CLASS} required name="applicationStage" value={opt.value} />
              <span className={RADIO_MARK_CLASS} aria-hidden="true" />
              <span className="leading-snug">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-3 flex flex-col pb-1">
        <legend className="text-sm font-semibold text-text-primary mb-2.5">
          Target study level<span className="text-error"> *</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LEVEL_OPTIONS.map((level) => (
            <label key={level} className={OPTION_LABEL_CLASS}>
              <input type="radio" className={RADIO_CLASS} required name="targetStudyLevel" value={level} />
              <span className={RADIO_MARK_CLASS} aria-hidden="true" />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-biggestQuestion" className="text-sm font-semibold text-text-primary">
          What is your biggest question or concern about this scholarship/session?
          <span className="text-error"> *</span>
        </label>
        <textarea
          id="reg-biggestQuestion"
          name="biggestQuestion"
          rows={5}
          required
          placeholder="Write a short answer so we can prepare for your Session."
          className="min-h-24 w-full resize-y rounded-xl border border-black/10 bg-gray-light px-3 py-2.5 text-sm leading-relaxed text-text-primary placeholder:text-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:min-h-28"
        />
      </div>

      <fieldset className="mb-3 flex flex-col pb-1">
        <legend className="text-sm font-semibold text-text-primary mb-2.5">
          How should we contact you about this Session?<span className="text-error"> *</span>
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {CONTACT_OPTIONS.map((opt) => (
            <label key={opt.value} className={OPTION_LABEL_CLASS}>
              <input type="radio" className={RADIO_CLASS} required name="preferredContactMethod" value={opt.value} />
              <span className={RADIO_MARK_CLASS} aria-hidden="true" />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-phone" className="text-sm font-semibold text-text-primary">
          Phone number<span className="text-error"> *</span>
        </label>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <CountryCodeButton />
          <input
            id="reg-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            placeholder="1712345678"
            className={`${INPUT_CLASS} disabled:cursor-not-allowed disabled:opacity-60`}
            name="phone"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-whatsapp" className="text-sm font-semibold text-text-primary">
            WhatsApp number<span className="font-normal text-gray-400"> (optional)</span>
          </label>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <CountryCodeButton />
            <input
              id="reg-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="1712345678"
              className={`${INPUT_CLASS} disabled:cursor-not-allowed disabled:opacity-60`}
              name="whatsapp"
            />
          </div>
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 py-1 text-sm text-text-primary">
          <input type="checkbox" className="size-4 shrink-0 accent-primary" name="sameAsPhone" />
          <span>Same as phone number</span>
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-email" className="text-sm font-semibold text-text-primary">
          Email address<span className="text-error"> *</span>
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={INPUT_CLASS}
            name="email"
          />
          <button
            type="button"
            className="min-h-11 w-full shrink-0 rounded-xl border border-primary px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            disabled
          >
            Verify your email
          </button>
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="reg-website">Website</label>
        <input id="reg-website" tabIndex={-1} autoComplete="off" name="website" />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-black/10 p-4">
        <p className="text-sm text-text-primary">
          This Session is paid and exclusive. Registration fee:{" "}
          <span className="font-semibold">
            <span className="font-bold">৳</span>
            <span className="font-bold">{price}</span> BDT
          </span>
        </p>
        <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm text-text-primary">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-primary"
            required
            name="paymentAcknowledged"
          />
          <span>I understand this is a paid Session and agree to complete the payment.</span>
        </label>
      </div>

      <div className="flex w-full flex-col items-center gap-2.5">
        <button
          data-slot="button"
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-[var(--shadow-button)] px-4 py-2 has-[>svg]:px-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90"
          type="button"
        >
          Pay Now
        </button>
        <button
          type="button"
          className="text-[11px] font-medium underline underline-offset-2 transition disabled:cursor-not-allowed disabled:opacity-50 text-gray-500 decoration-gray-400 hover:text-primary hover:decoration-primary"
        >
          Or I will pay later
        </button>
        <p className="max-w-sm text-center text-[11px] leading-snug text-gray-400">
          Prefer to pay later? We&apos;ll email you a secure payment link — your spot stays pending
          until payment is complete.
        </p>
      </div>
    </form>
  );
}
