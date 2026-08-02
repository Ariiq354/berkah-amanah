import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

export interface DeletableSelectItem {
  value: string;
  label: string;
}

export interface DeletableSelectProps {
  items: readonly (string | DeletableSelectItem)[];
  placeholder?: string;
  title?: string;
  value?: string | undefined;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

export function DeletableSelect({
  items,
  placeholder,
  title,
  value,
  onValueChange,
  className,
}: DeletableSelectProps) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );

  return (
    <Select
      value={value ?? ""}
      onValueChange={(val) => {
        onValueChange?.(val ? (val as string) : undefined);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
        {value ? (
          <span
            role="button"
            tabIndex={0}
            aria-label="Hapus pilihan"
            className="hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground cursor-pointer rounded-full p-0.5 transition-colors"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onValueChange?.(undefined);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                onValueChange?.(undefined);
              }
            }}
          >
            <X className="size-3.5" />
          </span>
        ) : null}
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {title && <SelectLabel>{title}</SelectLabel>}
          {normalizedItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
