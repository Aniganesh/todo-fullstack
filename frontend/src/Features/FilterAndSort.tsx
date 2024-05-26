import { useStore } from "@/Store";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Filter } from "lucide-react";
import { defaultTodoStatuses } from "@/types";
import clsx from "clsx";

interface FilterAndSortProps {}

const labels: Record<keyof typeof defaultTodoStatuses, string> = {
  complete: "Complete",
  inProgress: "In Progress",
  todo: "To do",
};

const FilterAndSort: FC<FilterAndSortProps> = () => {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const toggleValue = (value: string) => {
    if (typeof filter?.status === "string") {
      if (filter.status !== value) {
        setFilter({ ...filter, status: [filter.status, value] });
      } else {
        setFilter({ ...filter, status: [value] });
      }
    } else {
      if (filter?.status?.includes(value)) {
        setFilter({
          ...filter,
          status: filter.status.filter((stat) => stat !== value),
        });
      } else {
        setFilter({ ...filter, status: [...(filter?.status ?? []), value] });
      }
    }
  };
  return (
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
                    filter?.status === value || filter?.status?.includes(value),
                }
              )}
              key={key}
              tabIndex={0}
              onClick={() => toggleValue(key)}
            >
              {labels[key as keyof typeof labels]}
            </div>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterAndSort;
