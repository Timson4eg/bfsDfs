type ButtonProps = {
  value: string;
};

export const MyButton = ({ value }: ButtonProps) => {
  return <button className="bg-amber-300 p-1.5 border-2">{value}</button>;
};
