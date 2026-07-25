"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Field, inputClasses } from "../ui/Field";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { patientFormSchema, PatientFormValues } from "@/lib/schema";
import { usePatientSession } from "@/hook/usePatientSession";
import {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

const REQUIRED_FIELDS: Array<keyof PatientFormValues> = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "gender",
  "phoneNumber",
  "email",
  "address",
  "preferredLanguage",
  "nationality",
];

const PatientForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId');
  const isEdit = searchParams.get('status') === 'edit';
  const [completedCount, setCompletedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const {
    submitted,
    defaultData,
    submitForm,
    publishDraft,
    defaultSession,
    createSession,
    finishUpdate
  } = usePatientSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    values: defaultData as PatientFormValues,
    mode: "onBlur",
  });

  const values = useWatch({ control }) as PatientFormValues;

  useEffect(() => {
    const updateCount = () => {
      const count = REQUIRED_FIELDS.filter((key) => Boolean(values[key])).length;
      setCompletedCount(count);
      setProgress(Math.round((count / REQUIRED_FIELDS.length) * 100));
    };
    updateCount();
  }, [values]);

  useEffect(() => {
    if (sessionId) {
      defaultSession(sessionId)
    } else {
      createSession();
    }
  }, [sessionId, defaultSession, createSession]);

  const onSubmit = handleSubmit((data: PatientFormValues) => {
    if (isEdit) {
      publishDraft(data, 'submitted');
      finishUpdate();
    } else {
      submitForm(data);
    }

  });

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-14 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">
          You&apos;re all set
        </h2>
        <p className="text-sm text-ink-soft">
          Your information has been sent to the front desk. A staff member will call you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            router.replace("/");
          }}
          className="mt-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-primary hover:text-primary"
        >
          Start a new form
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-2xl flex-col gap-8 pb-28"
    >
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          Patient Intake Form
        </p>
        <h1 className="text-3xl font-medium text-ink">
          Please fill out the form below
        </h1>
        <p className="text-sm text-ink-soft">
          Fields marked <span className="text-muted">optional</span> can be left
          blank. Everything else helps our staff prepare for your visit.
        </p>
      </header>
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ink-soft">Identity</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="First Name" htmlFor="firstName" error={errors.firstName?.message}>
            <input
              id="firstName"
              className={inputClasses}
              autoComplete="given-name"
              {...register("firstName")}
            />
          </Field>
          <Field label="Middle Name" htmlFor="middleName">
            <input
              id="middleName"
              className={inputClasses}
              autoComplete="additional-name"
              {...register("middleName")}
            />
          </Field>
          <Field label="Last Name" htmlFor="lastName" error={errors.lastName?.message}>
            <input
              id="lastName"
              className={inputClasses}
              autoComplete="family-name"
               {...register("lastName")}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Date of Birth" htmlFor="dateOfBirth" error={errors.dateOfBirth?.message}>
            <input id="dateOfBirth" type="date" className={inputClasses} {...register("dateOfBirth")} />
          </Field>
          <Field label="Gender" htmlFor="gender" error={errors.gender?.message}>
            <select id="gender" className={inputClasses} {...register("gender")}>
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ink-soft">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              className={inputClasses}
              autoComplete="email"
              {...register("email")}
            />
          </Field>
          <Field label="Phone Number" htmlFor="phoneNumber" error={errors.phoneNumber?.message}>
            <input
              id="phoneNumber"
              type="tel"
              className={inputClasses}
              autoComplete="tel"
              {...register("phoneNumber")}
            />
          </Field>
        </div>
        <Field label="Address" htmlFor="address" error={errors.address?.message}>
          <textarea
            id="address"
            rows={2}
            className={inputClasses}
            autoComplete="street-address"
            {...register("address")}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Preferred Language" htmlFor="preferredLanguage" error={errors.preferredLanguage?.message}>
            <select
              id="preferredLanguage"
              className={inputClasses}
              {...register("preferredLanguage")}
            >
              <option value="">Select language</option>
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nationality" htmlFor="nationality" error={errors.nationality?.message}>
            <select id="nationality" className={inputClasses} {...register("nationality")}>
              <option value="">Select nationality</option>
              {NATIONALITY_OPTIONS.map((nat) => (
                <option key={nat} value={nat}>
                  {nat}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ink-soft">
          Additional Contact
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Emergency contact name"
            htmlFor="emergencyContactName"
            optional
            error={errors.emergencyContactName?.message}
          >
            <input id="emergencyContactName" className={inputClasses} {...register("emergencyContactName")} />
          </Field>
          <Field
            label="Relationship"
            htmlFor="emergencyContactRelationship"
            optional
            error={errors.emergencyContactRelationship?.message}
          >
            <select id="emergencyContactRelationship" className={inputClasses} {...register("emergencyContactRelationship")}>
              <option value="">Select relationship</option>
              {RELATIONSHIP_OPTIONS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Religion" htmlFor="religion" optional>
          <input id="religion" type="tel" className={inputClasses} {...register("religion")}/>
        </Field>
      </section>
      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs text-muted">
              <span>Required fields progress</span>
              <span className="font-[family-name:var(--font-mono)]">
                {completedCount}/{REQUIRED_FIELDS.length}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-idle-soft">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary-ink disabled:opacity-60"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientForm;
