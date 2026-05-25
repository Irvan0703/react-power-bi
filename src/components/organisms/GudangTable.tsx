type Props = {
  data: any[]
  selectedRows: number[]
  onToggleRow: (
    index: number
  ) => void
}

const sizeFields = [
  "25","26","27","28","29",
  "30","31","32","33","34",
  "35","36","37","38","39",
  "40","42","44",
  "ALLSIZE",
  "FS","XS","SS","S","M",
  "L","XL","XXL","XXXL",
]

export default function GudangTable({
  data,
  selectedRows,
  onToggleRow,
}: Props) {

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <p className="text-center text-gray-500">
        Tidak ada data untuk artikel ini.
      </p>
    )
  }

  return (
    <div className="rounded border bg-white p-3 shadow">
      
      <h2 className="mb-4 text-lg font-bold">
        📦 Tabel Stok Artikel Gudang
      </h2>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">
              </th>

              <th className="border p-2 whitespace-nowrap">
                Artikel
              </th>

              <th className="border p-2 whitespace-nowrap">
                Gudang
              </th>

              <th className="border p-2 whitespace-nowrap">
                Total Stock
              </th>

              <th className="border p-2 whitespace-nowrap">
                Status
              </th>

              {sizeFields.map((size) => (
                <th
                  key={size}
                  className="border p-2 whitespace-nowrap"
                >
                  {size}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(
              (row, index) => {

                const canCheck =
                  [
                    "PUSAT",
                    "KONSINETTO",
                  ].includes(
                    row.fv_whtypename
                  )

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                  >

                    {/* CHECKBOX */}
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        disabled={!canCheck}
                        onChange={() =>
                          onToggleRow(index)
                        }
                      />
                    </td>

                    {/* ARTIKEL */}
                    <td className="border p-2 whitespace-nowrap">
                      {row.fv_barcode}
                    </td>

                    {/* GUDANG */}
                    <td className="border p-2 whitespace-nowrap">
                      {row.fv_whtypename}
                    </td>

                    {/* TOTAL */}
                    <td className="border p-2 text-center">
                      {row.sumQty || 0}
                    </td>

                    {/* STATUS */}
                    <td className="border p-2 text-center">
                      {row.status || "-"}
                    </td>

                    {/* SIZE */}
                    {sizeFields.map(
                      (size) => (
                        <td
                          key={size}
                          className="border p-2 text-center"
                        >
                          {row[size] &&
                          row[size] !== 0
                            ? row[size]
                            : "-"}
                        </td>
                      )
                    )}
                  </tr>
                )
              }
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}