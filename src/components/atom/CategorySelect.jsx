import React, { Fragment, useRef } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Tag, Check, ChevronDown } from "lucide-react";

export default function CategorySelect({ categories, value, onChange }) {
  const buttonRef = useRef(null);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        {/* v2+ syntax: use Listbox.Button as a component, not a sub-tag */}
        <ListboxButton
          ref={buttonRef}
          className="
            w-full bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 
            text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300
            flex items-center relative
          "
        >
          <Tag className="w-5 h-5 text-gray-500 mr-2" />
          <span className="flex-1">
            {categories.find((c) => c.id === value)?.label || "Kategori Seç"}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* v2+ syntax: Listbox.Options is imported directly */}
          <ListboxOptions
            className="
              absolute z-10 mt-1 w-full bg-white border border-gray-200 
              rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none
            "
          >
            {categories.map((cat) => (
              <ListboxOption
                key={cat.id}
                value={cat.id}
                className={({ active }) =>
                  `
                    cursor-pointer select-none relative py-2 pl-10 pr-4
                    ${active ? "bg-blue-100 text-blue-900" : "text-gray-800"}
                  `
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                      {cat.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <Check className="w-5 h-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
