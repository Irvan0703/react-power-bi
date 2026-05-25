type Props = {
  rows: any[]
}

export default function DetailTable({
  rows,
}: Props) {

  if (!rows || rows.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Tidak ada data detail.
      </p>
    )
  }

  // ambil kolom size otomatis
  const sizeKeys = Object.keys(
    rows[0]
  ).filter(
    (key) =>
      ![
        "fc_code",
        "fv_barcode",
        "keterangan",
      ].includes(key) &&
      !isNaN(rows[0][key])
  )

  return (
    <div className="overflow-auto rounded border">
      <table className="min-w-full border-collapse text-sm">
        
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left whitespace-nowrap">
              Toko
            </th>

            <th className="border px-3 py-2 text-left whitespace-nowrap">
              Artikel
            </th>

            <th className="border px-3 py-2 text-left whitespace-nowrap">
              Keterangan
            </th>

            {sizeKeys.map((size) => (
              <th
                key={size}
                className="border px-3 py-2 text-center whitespace-nowrap"
              >
                {size}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50"
            >
              <td className="border px-3 py-2 text-left whitespace-nowrap">
                {row.fc_code}
              </td>

              <td className="border px-3 py-2 text-left whitespace-nowrap">
                {row.fv_barcode}
              </td>

              <td className="border px-3 py-2 text-left whitespace-nowrap">
                {row.keterangan}
              </td>

              {sizeKeys.map((size) => (
                <td
                  key={size}
                  className="border px-3 py-2 text-right"
                >
                  {row[size]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}