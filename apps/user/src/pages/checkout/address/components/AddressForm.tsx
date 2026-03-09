import { useState } from "react";
import EditIcon from "../../../../assets/icons/To edit.png";
import PlusIcon from "../../../../assets/icons/Plus.png";

type AddressType = "HOME" | "OFFICE";

interface Address {
  id: number;
  title: string;
  type: AddressType;
  address: string;
  phone: string;
}

const mockAddresses: Address[] = [
  {
    id: 1,
    title: "2118 Thornridge",
    type: "HOME",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "(209) 555-0104",
  },
  {
    id: 2,
    title: "Headoffice",
    type: "OFFICE",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(704) 555-0127",
  },
];

export default function AddressSelector() {
  const [selectedId, setSelectedId] = useState<number>(1);
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="mb-6 text-xl font-semibold">Select Address</h2>
      <div className="space-y-4">
        {mockAddresses.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-5 transition
                ${
                  isSelected
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-black">
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-black" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <span className="rounded-md bg-black px-2 py-0.5 text-xs font-medium text-white">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.address}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.phone}</p>
                </div>
              </div>
              <div
                className="flex items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center hover:opacity-70">
                  <img src={EditIcon} alt="Edit" className="h-5 w-5" />
                </button>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-500 hover:text-red-500">
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="h-px border-t border-dashed border-gray-300" />
        <button className="mx-6 flex cursor-pointer flex-col items-center gap-2 hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src={PlusIcon} alt="Add new address" className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium">Add New Address</span>
        </button>
        <div className="h-px border-t border-dashed border-gray-300" />
      </div>
      <div className="flex justify-end gap-4">
        <button className="min-w-[160px] cursor-pointer rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-100">
          Back
        </button>
        <button className="min-w-[160px] cursor-pointer rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800">
          Next
        </button>
      </div>
    </div>
  );
}
