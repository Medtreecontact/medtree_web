"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { debounce } from "lodash"; // Install with npm install lodash

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // Get the initial search value from URL params
  const initialQuery = searchParams.get("q") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  // Update the URL when the search value changes
  const handleSearch = useCallback(
    debounce((term: string) => {
      // Trim the term to remove leading and trailing whitespace
      const trimmedTerm = term.trim();
      
      const params = new URLSearchParams(searchParams);
      if (trimmedTerm) {
        params.set("q", trimmedTerm);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 600),
    [pathname, router, searchParams]
  );

  return (
    <div className="relative w-full md:max-w-[450px] rounded-xl border shadow-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        className="pl-10"
        placeholder="Recherche dans MedTree"
        value={searchValue}
        onChange={(e) => {
          // Still set the full value in the input for UX purposes
          setSearchValue(e.target.value);
          // But pass the trimmed value for search
          handleSearch(e.target.value);
        }}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
        </div>
      )}
    </div>
  );
}