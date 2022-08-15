export interface TabItemProps {
  leadingIcon: JSX.Element;
  label: string;
  ariaLabel: string;
  active: boolean;
  onClick: () => void;
}

function TabItem({
  leadingIcon,
  label,
  ariaLabel,
  active,
  onClick,
}: TabItemProps) {
  return (
    <li className="tab-item">
      <button
        type="button"
        className="tab-item-main"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {leadingIcon}
        {label}
      </button>
    </li>
  );
}

export default TabItem;
