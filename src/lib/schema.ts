import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const patientFormSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    middleName: z.string().trim(),
    lastName: z.string().trim().min(1, "Last name is required"),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => !Number.isNaN(Date.parse(val)), "Enter a valid date")
      .refine((val) => new Date(val) <= new Date(), "Date of birth can't be in the future"),
    gender: z.enum(["female", "male", "non-binary", "prefer-not-to-say"], {
      message: "Select a gender",
    }),
    phoneNumber: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Enter a valid phone number"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
    address: z.string().trim().min(1, "Address is required"),
    preferredLanguage: z.string().min(1, "Select a preferred language"),
    nationality: z.string().min(1, "Select a nationality"),
    emergencyContactName: z.string().trim(),
    emergencyContactRelationship: z.string().trim(),
    religion: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    const hasName = data.emergencyContactName.trim().length > 0;
    const hasRelationship = data.emergencyContactRelationship.trim().length > 0;
    if (hasName && !hasRelationship) {
      ctx.addIssue({
        code: "custom",
        path: ["emergencyContactRelationship"],
        message: "Add a relationship for this contact",
      });
    }
    if (hasRelationship && !hasName) {
      ctx.addIssue({
        code: "custom",
        path: ["emergencyContactName"],
        message: "Add a name for this contact",
      });
    }
  });

export type PatientFormValues = z.infer<typeof patientFormSchema>;
