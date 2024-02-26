export default function ErrorComp({ error }: { error: string }) {
  return (
    <div className="flex w-max animate-fadeup-slidein items-center gap-x-2 bg-[#F7E6E6] border border-red-400/10 py-1 px-2 rounded-md animate-fade-up">
      <svg height="24" viewBox="0 0 24 24" width="24">
        <path
          clipRule="evenodd"
          d="M16.3361 17.9998L7.00279 18C5.49294 18 4.52754 16.391 5.23806 15.0588L9.90471 6.30882C10.6576 4.89706 12.6812 4.89706 13.4341 6.30881L18.1008 15.0586C18.8113 16.3908 17.8459 17.9998 16.3361 17.9998ZM11.6694 8.50003C12.2217 8.50003 12.6694 8.94774 12.6694 9.50003V11.5C12.6694 12.0523 12.2217 12.5 11.6694 12.5C11.1171 12.5 10.6694 12.0523 10.6694 11.5V9.50003C10.6694 8.94774 11.1171 8.50003 11.6694 8.50003ZM11.6694 16C12.2217 16 12.6694 15.5523 12.6694 15C12.6694 14.4477 12.2217 14 11.6694 14C11.1171 14 10.6694 14.4477 10.6694 15C10.6694 15.5523 11.1171 16 11.6694 16Z"
          fill="#AE0404"
          fillRule="evenodd"
        ></path>
      </svg>
      <span className="text-[#AE0404] text-sm rounded-md">{error}</span>
    </div>
  );
}
