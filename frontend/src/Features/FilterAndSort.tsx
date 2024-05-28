import { useStore } from "@/Store";
import { Button } from "@/components/ui/button";
import { FC, useCallback, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Filter, SortAscIcon, SortDescIcon } from "lucide-react";
import { ValueOf } from "@/types";
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

interface FilterAndSortProps {}

const labels: Record<keyof typeof defaultTodoStatuses, string> = {
  complete: "Complete",
  inProgress: "In Progress",
  todo: "To do",
};

const FilterAndSort: FC<FilterAndSortProps> = () => {
  const filterAndSort = useStore((state) => state.filterAndSort);
  const updateFilter = useStore((state) => state.updateFilter);
  const appliedSort = filterAndSort?.sort;
  const initialSortType = Object.keys(
    appliedSort ?? {}
  )?.[0] as keyof IFilterAndSort["sort"];
  const [sortType, setSortType] = useState<
    keyof IFilterAndSort["sort"] | undefined
  >(initialSortType ?? undefined);
  const [sortDir, setSortDir] = useState<
    ValueOf<IFilterAndSort["sort"]> | undefined
  >(appliedSort?.createDateTime ?? appliedSort?.lastChangedDateTime);

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

  const setSort = useCallback(
    (value?: IFilterAndSort["sort"]) => {
      updateFilter({ sort: value });
    },
    [updateFilter]
  );
  useEffect(() => {
    console.log("effect");
    if (sortType && sortDir) {
      setSort({ [sortType]: sortDir });
    } else {
      setSort(undefined);
    }
    return () => {};
  }, [setSort, sortDir, sortType]);

  return (
    <>
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
          <Select value={sortType} onValueChange={setSortType as never}>
            <SelectTrigger>
              <SelectValue placeholder="Choose sort field" />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="createDateTime">Created</SelectItem>
              <SelectItem value="lastChangedDateTime">Last updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Select value={sortDir} onValueChange={setSortDir as never}>
            <SelectTrigger>
              <SelectValue placeholder="Choose direction" />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="ASC">
                <div className="flex gap-2">
                  <SortAscIcon /> Recent last
                </div>
              </SelectItem>
              <SelectItem value="DESC">
                <div className="flex gap-2">
                  <SortDescIcon /> Recent first
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default FilterAndSort;
