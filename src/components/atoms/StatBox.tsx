type Props = {
  value: number;
  label: string;
};

export default function StatBox({ value, label }: Props) {
  return (
    <div className="stat-box">
      <div className="value">{value.toLocaleString()}</div>
      <div className="label">{label}</div>
    </div>
  );
}