type ReportItem = {
  fv_catname?: string

  stocks_early?: number
  art_count_y?: number

  receive_dm?: number
  receive_do?: number

  adj_in?: number

  b_penjualan?: number
  b_mutasi?: number
  b_retur?: number

  adj_out?: number

  penjualan?: number
  mutasi?: number
  retur?: number

  stocks?: number
  art_count_x?: number

  stocks_req_mutasi_in?: number
  stocks_req_retur?: number
  stocks_req_mutasi_out?: number

  OstOB?: number
  OstDO?: number
  OstDM?: number

  stock_sum?: number
  artikel_count?: number
}

type Props = {
  report: ReportItem[]
}

export default function ReportSummaryBedahCounterTable({
  report,
}: Props) {

  const columns = [
    {
      key: "stocks_early",
      label: "Stok Awal",
    },
    {
      key: "art_count_y",
      label: "Artikel Stok Awal",
    },
    {
      key: "receive_dm",
      label: "Receive DM",
    },
    {
      key: "receive_do",
      label: "Receive DO",
    },
    {
      key: "adj_in",
      label: "Adjust In",
    },
    {
      key: "b_penjualan",
      label: "Batal Penjualan",
    },
    {
      key: "b_mutasi",
      label: "Batal Mutasi",
    },
    {
      key: "b_retur",
      label: "Batal Retur",
    },
    {
      key: "adj_out",
      label: "Adjust Out",
    },
    {
      key: "penjualan",
      label: "Penjualan",
    },
    {
      key: "mutasi",
      label: "Mutasi",
    },
    {
      key: "retur",
      label: "Retur",
    },
    {
      key: "stocks",
      label: "Stok Akhir",
    },
    {
      key: "art_count_x",
      label: "Artikel Stok Akhir",
    },
    {
      key: "stocks_req_mutasi_in",
      label: "Req Mutasi In",
    },
    {
      key: "stocks_req_retur",
      label: "Req Retur",
    },
    {
      key: "stocks_req_mutasi_out",
      label: "Req Mutasi Out",
    },
    {
      key: "OstOB",
      label: "OstOB",
    },
    {
      key: "OstDO",
      label: "OstDO",
    },
    {
      key: "OstDM",
      label: "OstDM",
    },
    {
      key: "stock_sum",
      label: "Stok Akhir Future",
    },
    {
      key: "artikel_count",
      label:
        "Artikel Stok Akhir Future",
    },
  ]

  const getTotal = (
    key: keyof ReportItem
  ) => {
    return report.reduce(
      (sum, item) =>
        sum + Number(item[key] || 0),
      0
    )
  }

  if (!report?.length) {
    return (
      <p className="text-center text-gray-500">
        No data available.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded bg-white p-3 shadow">

      <table className="min-w-full border border-gray-300 text-sm">

        <thead className="bg-gray-100 text-center">

          <tr>

            <th className="border px-3 py-2">
              Kategori
            </th>

            {columns.map((col) => (
              <th
                key={col.key}
                className="border px-3 py-2 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {report.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50"
            >

              <td className="border px-3 py-2">
                {item.fv_catname || "N/A"}
              </td>

              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border px-3 py-2 text-center"
                >
                  {Number(
                    item[
                      col.key as keyof ReportItem
                    ] || 0
                  ).toLocaleString()}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

        <tfoot className="bg-gray-100 font-bold text-center">

          <tr>

            <td className="border px-3 py-2">
              Total
            </td>

            {columns.map((col) => (
              <td
                key={col.key}
                className="border px-3 py-2"
              >
                {getTotal(
                  col.key as keyof ReportItem
                ).toLocaleString()}
              </td>
            ))}

          </tr>

        </tfoot>

      </table>

    </div>
  )
}