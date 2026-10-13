type Name =
  | "arrow"
  | "phone"
  | "pin"
  | "check"
  | "calendar"
  | "menu"
  | "close"
  | "leaf"
  | "clock"
  | "message"
  | "whatsapp";
const paths: Record<Name, string> = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  phone:
    "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z",
  pin: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  check: "m5 12 4 4L19 6",
  calendar: "M5 5h14v15H5zM8 3v4m8-4v4M5 10h14",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M18 6 6 18",
  leaf: "M20 3C9 2 3 9 5 16s15 4 15-13ZM5 20 16 9",
  clock: "M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  whatsapp:
    "M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5ZM8 7l-1 2c1 4 3 6 7 7l2-1-2-2-1 1a9 9 0 0 1-4-4l1-1-2-2Z",
  message: "M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z",
};
export function Icon({
  name,
  className = "",
}: {
  name: Name;
  className?: string;
}) {
  return (
    <svg
      className={"icon icon-" + name + " " + className}
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
