export default function RightTick({ className }: { className?: string }) {
  return (
    <svg className={className && className} height="13" width="16">
      <path
        d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
        fill="white"
      ></path>
    </svg>
  );
}
