import { useDebouncedCallback } from "@tanstack/react-pacer";
import { Search } from "lucide-react";

import { cn } from "#/lib/utils";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export type InputSearchProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type" | "onChange"
> & {
  debounceMs?: number;
  groupClassName?: string;
  onSearch: (query: string) => void;
};

export function InputSearch({
  className,
  debounceMs = 300,
  groupClassName,
  onSearch,
  placeholder = "Cari...",
  ...props
}: InputSearchProps) {
  const handleSearch = useDebouncedCallback(onSearch, { wait: debounceMs });

  return (
    <InputGroup className={cn("max-w-xs", groupClassName)}>
      <InputGroupInput
        {...props}
        className={className}
        placeholder={placeholder}
        type="search"
        onChange={(event) => handleSearch(event.currentTarget.value)}
      />
      <InputGroupAddon align="inline-start">
        <Search aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  );
}
