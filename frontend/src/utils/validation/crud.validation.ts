import { z } from "zod";

/** Reusable schema */
export const restaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Restaurant name must be at least 2 characters long")
    .max(50, "Restaurant name must be at most 50 characters long")
    .regex(/^[A-Za-z\s]+$/, "Restaurant name must contain only letters and spaces"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must be at most 100 characters long"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .refine((val) => val !== "0000000000", {
         message: "Phone number cannot be all zeros",
     }),     
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must be at most 100 characters long"),
});

export type RestaurantForm = z.infer<typeof restaurantSchema>;

export function validateRestaurant(
  data: RestaurantForm
): { valid: true; value: RestaurantForm } | { valid: false; errors: Record<string, string> } {
  const result = restaurantSchema.safeParse(data);

  if (result.success) {
    return { valid: true, value: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {

    const key = issue.path.join(".") || "form";
    
    if (!errors[key]) errors[key] = issue.message;
  }
  return { valid: false, errors };
}