import { prisma } from "./prisma";

export const getCollections = async () => {
  try {
    const result = await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getCollectionById = async (id: string) => {
  try {
    const result = await prisma.collection.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getCategories = async () => {
  try {
    const result = await prisma.categories.findMany();
    return result;
  } catch (error) {
    throw new Error("Failed To Fetch Data");
  }
};
