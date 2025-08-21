import { z } from "zod";

/** Reusable schema */
export const restaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Restaurant name is required"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
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