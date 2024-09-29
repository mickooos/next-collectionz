import Link from "next/link";
import { getCollections } from "@/lib/data";
import Card from "@/components/card";

export default async function Home() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold font-title">Latest Collection</h1>
        <Link
          href="/create"
          className="py-2 px-4 text-xl rounded-lg bg-gradient-to-r text-white
                   from-orange-700 to-emerald-700 hover:from-orange-600 hover:to-blue-700"
        >
          Add Collection
        </Link>
      </div>

      {/* Card Section */}
      <div className="grid gap-6 mt-4 w-full max-w-6xl p-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
