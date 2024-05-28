import { useStore } from "@/Store";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FC, useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Filter, SortAscIcon, SortDescIcon } from "lucide-react";
import { defaultTodoStatuses } from "@/types";
import clsx from "clsx";
import { type FilterAndSort as IFilterAndSort } from "@/api/Todos/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

interface FilterAndSortProps {}

const labels: Record<keyof typeof defaultTodoStatuses, string> = {
  complete: "Complete",
  inProgress: "In Progress",
  todo: "To do",
};


const FilterAndSort: FC<FilterAndSortProps> = () => {
  const filterAndSort = useStore((state) => state.filterAndSort);
  const updateFilter = useStore((state) => state.updateFilterAndSort);

  const appliedSort = filterAndSort?.sort;

  const [sortType, setSortType] = useState<string | undefined>(
    getSortTypeString(appliedSort) ?? undefined
  );

  const toggleStatusFilter = useCallback(
    (value: string) => {
      if (typeof filterAndSort?.filter?.status === "string") {
        if (filterAndSort.filter.status !== value) {
          updateFilter({
            filter: { status: [filterAndSort.filter?.status, value] },
          });
        } else {
          updateFilter({ filter: { status: [value] } });
        }
      } else {
        if (filterAndSort?.filter?.status?.includes(value)) {
          updateFilter({
            filter: {
              status: filterAndSort.filter.status.filter(
                (stat) => stat !== value
              ),
            },
          });
        } else {
          updateFilter({
            filter: {
              status: [...(filterAndSort?.filter?.status ?? []), value],
            },
          });
        }
      }
    },
    [filterAndSort?.filter?.status, updateFilter]
  );

  const setSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateFilter({ filter: { contains: e.target.value } });
    },
    [updateFilter]
  );

  const setSort = useCallback(
    (value: string) => {
      let sort: IFilterAndSort["sort"] = {};
      setSortType(value);
      switch (value) {
        case "recently-created-last":
          sort = { createDateTime: "ASC" };
          break;
        case "recently-created-first":
          sort = { createDateTime: "DESC" };
          break;
        case "recently-updated-last":
          sort = { lastChangedDateTime: "ASC" };
          break;
        case "recently-updated-first":
          sort = { lastChangedDateTime: "DESC" };
          break;
      }
      if (sort) {
        updateFilter({ sort });
      }
    },
    [updateFilter]
  );

  return (
    <div className="flex justify-center gap-4">
      <Input onChange={debounce(setSearch)} className="max-w-32" placeholder="Search" />
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant={"outline"}>
            <Filter /> Filter
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            className="bg-white shadow-md rounded-md flex flex-col gap-2 p-1"
          >
            {Object.entries(defaultTodoStatuses).map(([key, value]) => (
              <div
                className={clsx(
                  "relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 cursor-pointer",
                  {
                    "bg-zinc-100":
                      filterAndSort?.filter?.status === value ||
                      filterAndSort?.filter?.status?.includes(value),
                  }
                )}
                key={key}
                tabIndex={0}
                onClick={() => toggleStatusFilter(key)}
              >
                {labels[key as keyof typeof labels]}
              </div>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <div className="flex gap-4">
        <div className="relative">
          <Select value={sortType} onValueChange={setSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="recently-created-last">
                <div className="flex gap-2">
                  <SortAscIcon /> Recently created last
                </div>
              </SelectItem>
              <SelectItem value="recently-created-first">
                <div className="flex gap-2">
                  <SortDescIcon /> Recently created first
                </div>
              </SelectItem>
              <SelectItem value="recently-updated-last">
                <div className="flex gap-2">
                  <SortAscIcon /> Recently updated last
                </div>
              </SelectItem>
              <SelectItem value="recently-updated-first">
                <div className="flex gap-2">
                  <SortDescIcon /> Recently updated first
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterAndSort;

const getSortTypeString = (sort?: IFilterAndSort["sort"]) => {
  if (sort?.createDateTime)
    return `recently-created-${sort?.createDateTime === "ASC" ? "last" : "first"}`;
  if (sort?.lastChangedDateTime)
    return `recently-created-${sort?.lastChangedDateTime === "DESC" ? "last" : "first"}`;
  return undefined;
};
