"use server";
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCollectionById } from "./data";

const CreateSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categories: z.string().min(1, { message: "Categories is required" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must less than 4MB",
    }),
});

export const createData = async (prevState: unknown, formData: FormData) => {
  const validatedFields = CreateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, artist, description, categories, image } =
    validatedFields.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.collection.create({
      data: {
        title,
        artist,
        description,
        catId: Number(categories),
        image: url,
      },
    });
  } catch (error) {
    return { message: "Failed to create data" };
  }

  revalidatePath("/");
  redirect("/");
};

const UpdateSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artist: z.string().min(1, { message: "Artist is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categories: z.string().min(1, { message: "Categories is required" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must less than 4MB",
    })
    .optional(),
});

export const updateData = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = UpdateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await getCollectionById(id);
  if (!data) return { message: "No Data Found" };

  const { title, artist, description, categories, image } =
    validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.collection.update({
      data: {
        title,
        artist,
        description,
        catId: Number(categories),
        image: imagePath,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update data" };
  }

  revalidatePath("/");
  redirect("/");
};

export const deleteData = async (id: string) => {
  const data = await getCollectionById(id);
  if (!data) return { message: "No data found" };

  await del(data.image);
  try {
    await prisma.collection.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete data" };
  }

  revalidatePath("/");
};
