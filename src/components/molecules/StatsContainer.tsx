import StatBox from "../atoms/StatBox";

export default function StatsContainer({ stats }: any) {
  return (
    <div className="stats-container">
      {stats.map((s: any, i: number) => (
        <StatBox key={i} value={s.value} label={s.label} />
      ))}
    </div>
  );
}