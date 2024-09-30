import Link from "next/link";
import { getCollections } from "@/lib/data";
import Card from "@/components/card";

export default async function Home() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        {/* Project Title */}
        <h1 className="text-[15px] sm:text-lg lg:text-3xl font-bold font-title">
          Latest Collection
        </h1>
        {/* Button on the Right */}
        <Link
          href="/create"
          className="px-4 py-2 text-[10px] sm:text-md md:text-lg font-bold rounded-lg bg-gradient-to-r text-white
                   from-orange-700 to-emerald-700 hover:from-orange-600 hover:to-blue-700"
        >
          Add Collection
        </Link>
      </div>

      {/* Card Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collections?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
