"use client";

import Image from "next/image";
import * as React from "react";

import { Checkbox } from "@/components/auth/checkbox";
import { PasswordField } from "@/components/auth/password-field";

// Rebuilt from the original site's shared form generator (chunk 2175, module 42175).
type FieldOption = string | { value: string | number; label: React.ReactNode };

export type FormField = {
  name: string;
  label: React.ReactNode;
  type?:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "multi-select"
    | "multi-select-with-other"
    | "file"
    | "image"
    | string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  hidden?: boolean;
  halfWidth?: boolean;
  accept?: string;
  options?: FieldOption[];
  otherField?: { name: string; label: string };
  visibleWhen?: { field: string; equals: unknown }[];
};

export type FormValues = Record<string, unknown>;

type AuthFormProps = {
  fields: FormField[];
  onSubmit: (values: FormValues) => void | Promise<void>;
  submitLabel?: React.ReactNode;
  submitClassName?: string;
  inputClassName?: string;
  initialValues?: FormValues;
  onChange?: (name: string, value: unknown) => void;
  fieldErrors?: Record<string, string[]>;
  disabled?: boolean;
  formId?: string;
  beforeSubmit?: React.ReactNode;
};

// Module 42175 `c` - set a dotted path inside an object.
function setPath(source: FormValues, path: string, value: unknown): FormValues {
  const keys = path.split(".");
  const result: FormValues = { ...source };
  let cursor = result;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] =
        cursor[key] && typeof cursor[key] === "object" ? { ...(cursor[key] as FormValues) } : {};
      cursor = cursor[key] as FormValues;
    }
  });
  return result;
}

// Module 42175 `o` - get a dotted path from an object.
function getPath(source: FormValues | undefined, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" && key in acc ? (acc as FormValues)[key] : undefined,
      source
    );
}

export function AuthForm({
  fields,
  onSubmit,
  submitLabel,
  submitClassName,
  inputClassName = "w-full rounded-lg border-2 border-gray-300 bg-gray-100 p-2 focus:outline-2 focus:outline-[var(--color-accent)]",
  initialValues,
  onChange,
  fieldErrors,
  disabled,
  formId,
  beforeSubmit,
}: AuthFormProps) {
  const [values, setValues] = React.useState<FormValues>({});

  React.useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  const normalizeOption = (option: FieldOption) =>
    typeof option === "string" ? { label: option, value: option } : option;

  const hasHalfWidth = fields.some((field) => !!field.halfWidth && !field.hidden);

  const resolve = (field: FormField) =>
    getPath(values, field.name) ?? getPath(initialValues, field.name) ?? "";

  const isFieldVisible = (field: FormField) => {
    if (field.hidden) return false;
    if (!field.visibleWhen) return true;
    return field.visibleWhen.every(
      (rule) => (getPath(values, rule.field) ?? getPath(initialValues, rule.field)) === rule.equals
    );
  };

  return (
    <form
      id={formId}
      onSubmit={(event) => {
        event.preventDefault();
        let collected: FormValues = {};
        fields.forEach((field) => {
          const name = field.name;
          const raw = getPath(values, name) ?? getPath(initialValues, name) ?? "";
          if (field.type === "checkbox") {
            collected = setPath(collected, name, !!raw);
          } else if (field.type === "multi-select") {
            collected = setPath(collected, name, Array.isArray(raw) ? raw : []);
          } else {
            collected = setPath(collected, name, raw);
          }
        });
        onSubmit(collected);
      }}
      className={hasHalfWidth ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "space-y-4"}
      noValidate
    >
      {fields.map((field, index) => {
        const name = field.name;
        if (!isFieldVisible(field)) return null;

        const value = resolve(field);
        const errors = fieldErrors?.[name];
        const errorBlock = errors ? (
          <div className="space-y-1">
            {errors.map((message, errorIndex) => (
              <p key={errorIndex} className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>
        ) : null;
        const colSpanClass = hasHalfWidth && !field.halfWidth ? "col-span-2" : undefined;

        if (field.type === "textarea") {
          return (
            <div key={index} className={colSpanClass}>
              {errorBlock}
              <label htmlFor={name} className="mb-1 block font-medium">
                {field.label}
              </label>
              <textarea
                id={name}
                value={String(value)}
                placeholder={String(field.placeholder || "")}
                required={field.required}
                disabled={field.disabled}
                className={`${inputClassName} ${field.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                onChange={(event) => {
                  if (field.disabled) return;
                  setValues((current) => setPath(current, name, event.target.value));
                  onChange?.(name, event.target.value);
                }}
              />
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={index} className={colSpanClass}>
              {errorBlock}
              <label htmlFor={name} className="mb-1 block font-medium">
                {field.label}
              </label>
              <select
                id={name}
                value={value ? String(value) : ""}
                required={field.required}
                disabled={field.disabled}
                className={`${inputClassName} ${field.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                onChange={(event) => {
                  if (field.disabled) return;
                  setValues((current) => setPath(current, name, event.target.value));
                  onChange?.(name, event.target.value);
                }}
              >
                <option value="" disabled>
                  {String(field.placeholder || "Select...")}
                </option>
                {(field.options || []).map((option, optionIndex) => {
                  const normalized = normalizeOption(option);
                  return (
                    <option key={optionIndex} value={String(normalized.value)}>
                      {normalized.label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }

        if (field.type === "radio") {
          return (
            <div key={index}>
              {errorBlock}
              <div className="mb-1 font-medium">{field.label}</div>
              {(field.options || []).map((option, optionIndex) => {
                const normalized = normalizeOption(option);
                return (
                  <label key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={name}
                      value={String(normalized.value)}
                      checked={String(value) === String(normalized.value)}
                      onChange={() => {
                        setValues((current) => setPath(current, name, String(normalized.value)));
                        onChange?.(name, String(normalized.value));
                      }}
                    />
                    {normalized.label}
                  </label>
                );
              })}
            </div>
          );
        }

        if (field.type === "multi-select") {
          const selected = Array.isArray(value) ? (value as string[]) : [];
          return (
            <div key={index}>
              {errorBlock}
              <label className="mb-1 block font-medium">{field.label}</label>
              <div className="grid grid-cols-2 gap-2 rounded-lg border-2 border-gray-300 bg-gray-100 p-4">
                {(field.options || []).map((option, optionIndex) => {
                  const normalized = normalizeOption(option);
                  return (
                    <label key={optionIndex} className="flex items-center gap-2">
                      <Checkbox
                        checked={selected.includes(String(normalized.value))}
                        onCheckedChange={(checked) => {
                          setValues((current) => {
                            const next = checked
                              ? [...selected, String(normalized.value)]
                              : selected.filter((v) => v !== String(normalized.value));
                            onChange?.(name, next);
                            return setPath(current, name, next);
                          });
                        }}
                      />
                      {normalized.label}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        }

        if (field.type === "multi-select-with-other") {
          const selected = Array.isArray(value) ? (value as string[]) : [];
          return (
            <div key={index}>
              {errorBlock}
              <label className="mb-1 block font-medium">{field.label}</label>
              <div className="grid grid-cols-2 gap-2 rounded-lg border-2 border-gray-300 bg-gray-100 p-4">
                {(field.options || []).map((option, optionIndex) => {
                  const normalized = normalizeOption(option);
                  const isOther = normalized.value === "Other";
                  return (
                    <div key={optionIndex} className="flex flex-col gap-1">
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={selected.includes(String(normalized.value))}
                          onCheckedChange={(checked) => {
                            setValues((current) => {
                              const next = checked
                                ? [...selected, String(normalized.value)]
                                : selected.filter((v) => v !== String(normalized.value));
                              onChange?.(name, next);
                              return setPath(current, name, next);
                            });
                          }}
                        />
                        {normalized.label}
                      </label>
                      {isOther && selected.includes("Other") && field.otherField ? (
                        <input
                          type="text"
                          placeholder={field.otherField.label}
                          className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                          value={String(getPath(values, field.otherField.name) || "")}
                          onChange={(event) => {
                            setValues((current) => {
                              onChange?.(field.otherField!.name, event.target.value);
                              return setPath(current, field.otherField!.name, event.target.value);
                            });
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (field.type === "checkbox") {
          return (
            <div key={index} className="flex items-center">
              {errorBlock}
              <Checkbox
                id={name}
                name={name}
                checked={!!value}
                onCheckedChange={(checked) => {
                  setValues((current) => setPath(current, name, checked));
                  onChange?.(name, checked);
                }}
              />
              <label htmlFor={name} className="ml-2">
                {field.label}
              </label>
            </div>
          );
        }

        if (field.type === "file" || field.type === "image") {
          return (
            <div key={index} className="flex flex-col gap-2">
              {errorBlock}
              <label htmlFor={name} className="block font-medium">
                {field.label}
              </label>
              {value && typeof value === "string" ? (
                <Image
                  src={value}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-(--color-accent)"
                />
              ) : null}
              <input
                id={name}
                type="file"
                accept={field.accept || "image/*"}
                className="w-full cursor-pointer rounded-md border p-2"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const body = new FormData();
                  body.append("file", file);
                  try {
                    // NOTE: backend endpoint was lost with the original site - wire to your API
                    // Original: POST /api/upload -> { success, url }
                    const response = await fetch("/api/upload", { method: "POST", body });
                    if (!response.ok) throw Error("Upload failed");
                    const payload = await response.json();
                    if (payload.success && payload.url) {
                      setValues((current) => setPath(current, name, payload.url));
                      onChange?.(name, payload.url);
                    }
                  } catch (error) {
                    console.error("❌ Client error:", error);
                  }
                }}
              />
            </div>
          );
        }

        if (field.type === "password") {
          return (
            <div key={index} className={colSpanClass}>
              {errorBlock}
              <label htmlFor={name} className="mb-1 block font-medium">
                {field.label}
              </label>
              <PasswordField
                id={name}
                name={name}
                value={String(value)}
                placeholder={String(field.placeholder || "")}
                maxLength={field.maxLength}
                required={field.required}
                disabled={field.disabled}
                autoComplete={name.toLowerCase().includes("confirm") ? "new-password" : "new-password"}
                className={`${inputClassName} ${field.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                onChange={(event) => {
                  if (field.disabled) return;
                  setValues((current) => setPath(current, name, event.target.value));
                  onChange?.(name, event.target.value);
                }}
              />
            </div>
          );
        }

        return (
          <div key={index} className={colSpanClass}>
            {errorBlock}
            <label htmlFor={name} className="mb-1 block font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              id={name}
              value={String(value)}
              placeholder={String(field.placeholder || "")}
              maxLength={field.maxLength}
              required={field.required}
              disabled={field.disabled}
              onChange={(event) => {
                if (field.disabled) return;
                setValues((current) => setPath(current, name, event.target.value));
                onChange?.(name, event.target.value);
              }}
              className={`${inputClassName} ${field.disabled ? "cursor-not-allowed opacity-60" : ""}`}
            />
          </div>
        );
      })}
      {beforeSubmit ? <div className={hasHalfWidth ? "col-span-2" : undefined}>{beforeSubmit}</div> : null}
      {submitLabel ? (
        <button
          type="submit"
          disabled={disabled}
          className={`${submitClassName || "btn-primary mt-4 w-full"}${hasHalfWidth ? " col-span-2" : ""}`}
          style={disabled ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
        >
          {submitLabel}
        </button>
      ) : null}
    </form>
  );
}

export default AuthForm;
