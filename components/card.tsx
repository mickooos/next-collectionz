import Image from "next/image";
import { EditButton, DeleteButton } from "@/components/button";
import { Collection } from "@prisma/client";

const Card = ({ data }: { data: Collection }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative aspect-video">
        <Image
          src={data.image}
          alt={data.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-t-md object-cover"
        />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {data.title}
        </h1>
        <h3 className="text-sm font-normal text-gray-700 truncate">
          {data.artist}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <EditButton id={data.id} />
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default Card;
