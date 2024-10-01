"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export type State = {
  status: "error" | "success" | "undefined";
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters." }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "Price has to be higher than 1" }),
  summary: z
    .string()
    .min(10, { message: "Please summarize your product more" }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z
    .string()
    .min(1, { message: "Please upload a zip file of your product" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    summary: formData.get("summary"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "",
    };

    return state;
  }
}
