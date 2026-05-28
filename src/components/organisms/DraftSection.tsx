import { useMemo } from "react"
import DraftContainer from "./DraftContainer"
import { deleteDraft } from "../../api/bedah_counter"

const sizeColumns = [
  "25","26","27","28","29",
  "30","31","32","33","34",
  "35","36","37","38","39",
  "40","42","44",
  "ALLSIZE",
  "FS","XS","SS","S","M",
  "L","XL","XXL","XXXL",
]

type Props = {
    type: "retur" | "in" | "out" | "order"
    data: any[]
    subid: string
    onReload: () => Promise<void>
    keterangan: string
    onChangeKeterangan: (
        value: string
    ) => void
    tanggalOnStore?: string
    onChangeTanggal?: (
        value: string
    ) => void
}

export default function DraftSection({
  type,
  data,
  subid,
  onReload,
  keterangan,
  onChangeKeterangan,
  tanggalOnStore,
  onChangeTanggal,
}: Props) {


  /* =========================
     SUMMARY
  ========================= */
  const summary = useMemo(() => {

    let totalRows = data.length
    let totalQty = 0

    const tokoMap: Record<
      string,
      number
    > = {}

    const sizeMap: Record<
      string,
      number
    > = {}

    sizeColumns.forEach((s) => {
      sizeMap[s] = 0
    })

    data.forEach((item) => {

      const toko =
        item.Toko ||
        item.fv_whtypename ||
        "-"

      if (!tokoMap[toko]) {
        tokoMap[toko] = 0
      }

      sizeColumns.forEach((size) => {

        const qty = Number(
          item[size] || 0
        )

        totalQty += qty

        sizeMap[size] += qty

        tokoMap[toko] += qty
      })
    })

    return {
      totalRows,
      totalQty,
      totalToko:
        Object.keys(tokoMap)
          .length,
      tokoMap,
      sizeMap,
    }
  }, [data])

  /* =========================
     DELETE ROW
  ========================= */
  const handleDelete = async (
    item: any
  ) => {

        const draftCode = item.fv_nodraft

        if (!draftCode) {
            alert(
            "Kode draft tidak ditemukan"
            )
            return
        }

        const confirmed =
            window.confirm(
            "Yakin ingin menghapus draft ini?"
            )

        if (!confirmed) return

        try {

            await deleteDraft({
                nodraft: draftCode,
                subid,
            })

            alert(
            "Draft berhasil dihapus"
            )

            await onReload()

        } catch (error) {

            console.error(error)

            alert(
            "Gagal menghapus draft"
            )
        }
    }

  return (
    <DraftContainer
      type={type}
      totalRows={
        summary.totalRows
      }
      totalQty={
        summary.totalQty
      }
      totalToko={
        summary.totalToko
      }
      tanggalOnStore={
        tanggalOnStore
      }
      onChangeTanggal={
        onChangeTanggal
      }
      keterangan={keterangan}
      onChangeKeterangan={
        onChangeKeterangan
      }
      detailContent={
        type === "retur" ? (
          <div className="grid grid-cols-3 gap-1 text-sm">

            {Object.entries(
              summary.sizeMap
            ).map(
              ([size, qty]) => {

                if (
                  Number(qty) <= 0
                ) {
                  return null
                }

                return (
                  <div
                    key={size}
                    className="rounded bg-white/20 px-2 py-1"
                  >
                    <strong>
                      {size}
                    </strong>
                    {" : "}
                    {qty}
                  </div>
                )
              }
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 text-sm">

            {Object.entries(
              summary.tokoMap
            ).map(
              ([toko, qty]) => (
                <div
                  key={toko}
                  className="rounded bg-white/20 px-2 py-1"
                >
                  {toko}
                  {" : "}
                  {qty}
                </div>
              )
            )}
          </div>
        )
      }
    >

      {/* TABLE */}
      <div className="overflow-auto rounded border bg-white">

        <table className="min-w-full border-collapse text-sm">

          <thead className="bg-gray-100">

            <tr>
              <th className="border px-3 py-2">
                Action
              </th>

              <th className="border px-3 py-2">
                Nama Artikel
              </th>

              <th className="border px-3 py-2">
                Kategori
              </th>

              {type !== "retur" && (
                <th className="border px-3 py-2">
                  {type === "order"
                    ? "Gudang"
                    : "Toko"}
                </th>
              )}

              <th className="border px-3 py-2">
                Total
              </th>

              {sizeColumns.map(
                (size) => (
                  <th
                    key={size}
                    className="border px-3 py-2"
                  >
                    {size}
                  </th>
                )
              )}
            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    type === "retur"
                      ? 33
                      : 34
                  }
                  className="py-6 text-center text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map(
                (
                  item,
                  index
                ) => {

                  const total =
                    sizeColumns.reduce(
                      (
                        acc,
                        size
                      ) =>
                        acc +
                        Number(
                          item[
                            size
                          ] || 0
                        ),
                      0
                    )

                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50"
                    >

                      {/* ACTION */}
                      <td className="border px-3 py-2 text-center">

                        <button
                          onClick={() =>
                            handleDelete(
                              item
                            )
                          }
                          className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                        >
                          Hapus
                        </button>

                      </td>

                      {/* BARCODE */}
                      <td className="border px-3 py-2">
                        {
                          item.fv_barcode
                        }
                      </td>

                      {/* CATEGORY */}
                      <td className="border px-3 py-2">
                        {
                          item.fv_catname
                        }
                      </td>

                      {/* TOKO / GUDANG */}
                      {type !== "retur" && (
                        <td className="border px-3 py-2">

                          {type ===
                          "order"
                            ? item.fv_whtypename
                            : item.Toko}

                        </td>
                      )}

                      {/* TOTAL */}
                      <td className="border px-3 py-2 text-center">
                        {total}
                      </td>

                      {/* SIZE */}
                      {sizeColumns.map(
                        (size) => (
                          <td
                            key={size}
                            className="border px-3 py-2 text-center"
                          >
                            {
                              item[
                                size
                              ] || 0
                            }
                          </td>
                        )
                      )}

                    </tr>
                  )
                }
              )
            )}

          </tbody>

        </table>

      </div>

    </DraftContainer>
  )
}