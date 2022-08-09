import React from "react";
import TabItem, { TabItemProps } from "./TabItem";
import { MdPendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import "./Tab.sass";
export type FilterStatus = "pending" | "in progress" | "done";

interface TabGroupProps {
  activeFilter: FilterStatus;
  onFilterChange: (filterStatus: FilterStatus) => void;
}

type ExtendedTabItemProps = TabItemProps & {
  filterId: FilterStatus;
};

function TabGroup({ activeFilter, onFilterChange }: TabGroupProps) {
  const tabItems: ExtendedTabItemProps[] = [
    {
      filterId: "pending",
      leadingIcon: <MdPendingActions />,
      label: "Pending",
      ariaLabel: "Future tasks",
      active: activeFilter === "pending",
      onClick: () => {},
    },
    {
      filterId: "in progress",
      leadingIcon: <GrInProgress />,
      label: "In progress",
      ariaLabel: "Need to be done asap",
      active: activeFilter === "in progress",
      onClick: () => {},
    },
    {
      filterId: "done",
      leadingIcon: <AiOutlineFileDone />,
      label: "Done",
      ariaLabel: "Tasks are completed",
      active: activeFilter === "done",
      onClick: () => {},
    },
  ];

  return (
    <ul className="tab-group">
      {tabItems.map((tabItem) => (
        <TabItem
          key={tabItem.label}
          leadingIcon={tabItem.leadingIcon}
          label={tabItem.label}
          ariaLabel={tabItem.ariaLabel}
          active={tabItem.active}
          onClick={() => onFilterChange(tabItem.filterId)}
        />
      ))}
    </ul>
  );
}

export default TabGroup;
