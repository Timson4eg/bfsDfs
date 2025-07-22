interface TableComponentProps {
  value: string | number;
  stateColor: string;
  border: string;
}

export const TableComponent = ({
  value,
  stateColor,
  border,
}: TableComponentProps) => {
  return (
    <div
      className={`w-10 h-10  ${stateColor} ${border} text-gray-600 rounded-md flex justify-center items-center`}
    >
      {value}
    </div>
  );
};
