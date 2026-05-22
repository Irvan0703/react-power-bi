import {
  useEffect,
  useState,
} from "react"

type RowData = {
  fv_barcode?: string
  fv_toko?: string
  aging?: string | number
  sumQty?: string | number
  sales?: string | number
  SalesThru?: string | number
  status?: string

  OstOB?: string | number
  OstDO?: string | number
  OstDM?: string | number

  stocks_req_mutasi_in?: string | number
  stocks_req_retur?: string | number
  stocks_req_mutasi_out?: string | number

  stockfuture?: string | number

  retur?: string | number
  Mutasi?: string | number

  [key: string]: any
}

type Props = {
  open: boolean
  row: RowData | null

  onClose: () => void

  onConfirm: (
    payload: RowData
  ) => void
}

const sizeFields = [
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "42",
  "44",
  "ALLSIZE",
  "FS",
  "XS",
  "SS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
]

export default function ReturModal({
  open,
  row,
  onClose,
  onConfirm,
}: Props) {
  const [formData, setFormData] =
    useState<RowData | null>(null)

  useEffect(() => {
    if (row) {
      setFormData({ ...row })
    }
  }, [row])

  if (!open || !formData) return null

  const handleQtyChange = (
    size: string,
    value: string
  ) => {
    const max = Number(row?.[size] || 0)

    let qty = Number(value)

    if (qty < 0) qty = 0
    if (qty > max) qty = max

    setFormData((prev) => ({
      ...prev!,
      [size]: qty,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      
      <div className="flex max-h-[95vh] w-full max-w-[98vw] flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-bold">
            Konfirmasi Retur
          </h2>

          <button
            onClick={onClose}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-auto p-4">

          <h3 className="mb-3 font-semibold">
            Data Terpilih
          </h3>

          <div className="overflow-auto rounded border">
            <table className="min-w-max border-collapse text-sm">
              
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border p-2">
                    Pilih
                  </th>

                  <th className="border p-2">
                    Artikel
                  </th>

                  <th className="border p-2">
                    Toko
                  </th>

                  <th className="border p-2">
                    Aging
                  </th>

                  <th className="border p-2">
                    Stock Akhir
                  </th>

                  <th className="border p-2">
                    Sales
                  </th>

                  <th className="border p-2">
                    Sales Thru(%)
                  </th>

                  <th className="border p-2">
                    Keterangan
                  </th>

                  <th className="border p-2">
                    OTS OB
                  </th>

                  <th className="border p-2">
                    OTS DO
                  </th>

                  <th className="border p-2">
                    OTS DM
                  </th>

                  <th className="border p-2">
                    Req MI
                  </th>

                  <th className="border p-2">
                    Req Retur
                  </th>

                  <th className="border p-2">
                    Req MO
                  </th>

                  <th className="border p-2">
                    Stock Future
                  </th>

                  <th className="border p-2">
                    Retur
                  </th>

                  <th className="border p-2">
                    Mutasi
                  </th>

                  {sizeFields.map((size) => (
                    <th
                      key={size}
                      className="border p-2"
                    >
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                    />
                  </td>

                  <td className="border p-2">
                    {formData.fv_barcode || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.fv_toko || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.aging || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.sumQty || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.sales || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.SalesThru || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.status || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.OstOB || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.OstDO || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.OstDM || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.stocks_req_mutasi_in || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.stocks_req_retur || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.stocks_req_mutasi_out || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.stockfuture || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.retur || "-"}
                  </td>

                  <td className="border p-2">
                    {formData.Mutasi || "-"}
                  </td>

                  {sizeFields.map((size) => {
                    const original =
                      Number(row?.[size] || 0)

                    const value =
                      Number(
                        formData?.[size] || 0
                      )

                    return (
                      <td
                        key={size}
                        className="border p-1"
                      >
                        <input
                          type="number"
                          min={0}
                          max={original}
                          disabled={
                            original <= 0
                          }
                          value={value}
                          onChange={(e) =>
                            handleQtyChange(
                              size,
                              e.target.value
                            )
                          }
                          className="w-[70px] rounded border px-2 py-1 text-sm"
                        />
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t px-5 py-4">
          
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            onClick={() =>
              onConfirm(formData)
            }
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  )
}