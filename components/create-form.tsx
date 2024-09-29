"use client";
import React from "react";
import { createData } from "@/lib/action";
import { useFormState } from "react-dom";
import type { Categories } from "@prisma/client";
import { SubmitButton } from "./button";

const CreateForm = ({ categories }: { categories: Categories[] }) => {
  const [state, formAction] = useFormState(createData, null);

  return (
    <form action={formAction}>
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <div className="font-medium">{state?.message}</div>
        </div>
      ) : null}

      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Title"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input
          type="text"
          name="artist"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Artist"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.artist}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <textarea
          name="description"
          rows={6}
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Description"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">
            {state?.error?.description}
          </p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <select
          name="categories"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
        >
          <option value="">Select a Categories</option>
          {categories?.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">
            {state?.error?.categories}
          </p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200
            hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <SubmitButton label="create" />
      </div>
    </form>
  );
};

export default CreateForm;
