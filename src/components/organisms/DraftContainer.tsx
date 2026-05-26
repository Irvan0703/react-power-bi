type Props = {
  type: "retur" | "in" | "out" | "order"

  totalRows: number
  totalQty: number
  totalToko?: number

  detailContent?: React.ReactNode

  children: React.ReactNode

  keterangan: string
  onChangeKeterangan: (
    value: string
  ) => void

  tanggalOnStore?: string
  onChangeTanggal?: (
    value: string
  ) => void
}

export default function DraftContainer({
  type,

  totalRows,
  totalQty,
  totalToko,

  detailContent,

  children,

  keterangan,
  onChangeKeterangan,

  tanggalOnStore,
  onChangeTanggal,
}: Props) {

  const titleMap = {
    retur: "Retur Artikel dan Size",
    in: "Mutasi In Artikel dan Size",
    out: "Mutasi Out Artikel dan Size",
    order: "Order Booking Artikel dan Size",
  }

  const keteranganLabelMap = {
    retur: "Keterangan Retur",
    in: "Keterangan Mutasi In",
    out: "Keterangan Mutasi Out",
    order: "Keterangan Order Booking",
  }

  return (
    <div className="mt-8 space-y-4">

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* TOTAL TOKO */}
        {type !== "retur" && (
          <div className="rounded bg-blue-500 p-4 text-white shadow">

            <div className="text-sm font-medium">
              Total Toko
            </div>

            <div className="mt-2 text-3xl font-bold">
              {totalToko || 0}
            </div>

            <div className="mt-1 text-xs opacity-80">
              Jumlah toko dipilih
            </div>

          </div>
        )}

        {/* TOTAL ITEM */}
        <div className="rounded bg-indigo-500 p-4 text-white shadow">

          <div className="text-sm font-medium">
            Total Item
          </div>

          <div className="mt-2 text-3xl font-bold">
            {totalRows}
          </div>

          <div className="mt-1 text-xs opacity-80">
            Jumlah artikel dipilih
          </div>

        </div>

        {/* TOTAL QTY */}
        <div className="rounded bg-green-500 p-4 text-white shadow">

          <div className="text-sm font-medium">
            Total Qty
          </div>

          <div className="mt-2 text-3xl font-bold">
            {totalQty}
          </div>

          <div className="mt-1 text-xs opacity-80">
            Total keseluruhan qty
          </div>

        </div>

      </div>

      {/* DETAIL */}
      <div className="rounded bg-cyan-500 p-4 text-white shadow">

        <div className="mb-3 text-sm font-semibold">
          Detail
        </div>

        {detailContent}

      </div>

      {/* TITLE */}
      <h2 className="text-xl font-bold">
        {titleMap[type]}
      </h2>

      {/* TABLE */}
      {children}

      {/* ON STORE */}
      {type === "order" && (
        <div className="space-y-2">

          <label className="block text-sm font-medium">
            Pilih Tanggal On Store
          </label>

          <input
            type="date"
            value={tanggalOnStore}
            onChange={(e) =>
              onChangeTanggal?.(
                e.target.value
              )
            }
            className="rounded border px-3 py-2"
          />

        </div>
      )}

      {/* KETERANGAN */}
      <div className="space-y-2">

        <label className="block text-sm font-medium">
          {
            keteranganLabelMap[
              type
            ]
          }
        </label>

        <textarea
          rows={4}
          value={keterangan}
          onChange={(e) =>
            onChangeKeterangan(
              e.target.value
            )
          }
          className="w-full rounded border px-3 py-2"
        />

      </div>

    </div>
  )
}