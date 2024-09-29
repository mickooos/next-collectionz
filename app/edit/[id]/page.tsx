import EditForm from "@/components/edit-form";
import { getCollectionById, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const data = await getCollectionById(params.id);
  const cat = await getCategories();
  if (!data) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-2xl font-bold mb-5 text-center">Update Image</h1>
        <EditForm data={data} categories={cat} />
      </div>
    </div>
  );
};

export default EditPage;
