import CreateForm from "@/components/create-form";
import { getCategories } from "@/lib/data";

const CreatePage = async () => {
  const [categories] = await Promise.all([getCategories()]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-2xl font-bold mb-5 text-center">Add Collection</h1>
        <CreateForm categories={categories} />
      </div>
    </div>
  );
};

export default CreatePage;
