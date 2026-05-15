export default function SummaryTable({ data }: any) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Kategori</th>
          <th>Stok awal</th>
          <th>Total Sales</th>
          <th>Stok Akhir</th>
          <th>Sales Thru</th>
          <th>Sales Contribusi</th>
          <th>Broken (art)</th>
          <th>Sehat (art)</th>
          <th>Total (art)</th>
          <th>Broken (pcs)</th>
          <th>Sehat (pcs)</th>
          <th>Total (pcs)</th>
          <th>Aging &gt; 12 bulan</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, i: number) => (
          <tr key={i}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>{ row[4] }%</td>
            <td>{ row[5] }%</td>
            <td>{ row[6] }</td>
            <td>{ row[7] }</td>
            <td>{ row[8] }</td>
            <td>{ row[9] }</td>
            <td>{ row[10] }</td>
            <td>{ row[11] }</td>
            <td>{ row[12] }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}