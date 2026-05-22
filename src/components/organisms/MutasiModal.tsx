import Modal from "../atoms/Modal"
import Button from "../atoms/Button"
import { useEffect, useState } from "react"

type Props = {
  open: boolean
  onClose: () => void
  selectedRow: any
  draftData: any[]
  onConfirm: () => void
  type: "in" | "out"
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

const renderColoredCell = (
  value: any
) => {
  const val = Number(value || 0)

  return (
    <span
      className={
        val < 0
          ? "font-semibold text-red-500"
          : ""
      }
    >
      {val}
    </span>
  )
}

export default function MutasiModal({
  open,
  onClose,
  selectedRow,
  draftData,
  onConfirm,
  type,
}: Props) {

    const [selectedDraft, setSelectedDraft] = useState<number | null>(null)
    const [editedDraft, setEditedDraft] = useState<any[]>([])
    const [checkedDrafts, setCheckedDrafts] = useState<number[]>([])
    const [editedSelectedRow, setEditedSelectedRow] = useState<any>(null)
    const [originalDraft, setOriginalDraft] = useState<any[]>([])
    const [originalSelectedRow, setOriginalSelectedRow] = useState<any>(null)

    useEffect(() => {
        setEditedDraft(draftData)
        setOriginalDraft(
            JSON.parse(
                JSON.stringify(draftData)
            )
        )
        setEditedSelectedRow(selectedRow)
        setOriginalSelectedRow(selectedRow)

        if (type === "in") {
            setCheckedDrafts([])
        } else {
            setSelectedDraft(null)
        }
    }, [draftData, selectedRow, type])

    const handleSizeChange = (
        rowIndex: number,
        sizeIndex: number,
        value: number
    ) => {
        const original =
            originalDraft[rowIndex]?.[
                sizeIndex
            ] || 0

        // tidak boleh minus
        if (value < 0) {
            value = 0
        }

        // tidak boleh lebih besar
        if (value > original) {
            value = original
        }
        setEditedDraft((prev) => {
            const temp = [...prev]

            temp[rowIndex][sizeIndex] = value

            return temp
        })
    }

    const toggleDraftChecked = (
    index: number
    ) => {
        setCheckedDrafts((prev) => {
            if (prev.includes(index)) {
            return prev.filter(
                (i) => i !== index
            )
            }

            return [...prev, index]
        })
    }

    const handleSelectedSizeChange = (
        size: string,
        value: number
    ) => {
        const original =
            originalSelectedRow?.[
                size
            ] || 0

        if (value < 0) {
            value = 0
        }

        if (value > original) {
            value = original
        }
        setEditedSelectedRow((prev: any) => ({
            ...prev,
            [size]: value,
        }))
    }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Konfirmasi Mutasi ${
        type === "in"
            ? "In"
            : "Out"
        }`}
      size="fullscreen"
    >
      <div className="space-y-6">

        {/* DATA TERPILIH */}
        <div>
          <h2 className="mb-3 text-lg font-bold">
            Data Terpilih
          </h2>

          <div className="overflow-auto border rounded">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
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
                    {selectedRow?.fv_barcode || "-"}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.fv_toko || "-"}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.aging || 0}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.sumQty || 0}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.sales || 0}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.SalesThru || 0}%
                  </td>

                  <td className="border p-2">
                    {selectedRow?.status || "-"}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.retur || 0}
                  </td>

                  <td className="border p-2">
                    {selectedRow?.Mutasi || 0}
                  </td>

                  {sizeFields.map((size) => (
                    <td
                        key={size}
                        className="border p-2 text-center"
                    >
                        {type === "out" ? (
                            <input
                                type="number"
                                className="w-16 rounded border px-1 py-0.5"
                                value={
                                    editedSelectedRow?.[size] || 0
                                }
                                min={0}
                                max={
                                    originalSelectedRow?.[
                                        size
                                    ] || 0
                                }
                                disabled={
                                    (originalSelectedRow?.[
                                        size
                                    ] || 0) <= 0
                                }
                                onChange={(e) =>
                                    handleSelectedSizeChange(
                                        size,
                                        Number(e.target.value)
                                    )
                                }
                            />
                        ) : (
                            renderColoredCell(
                                selectedRow?.[size]
                            )
                        )}
                    </td>
                ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* DRAFT MUTASI */}
        <div>
          <h2 className="mb-3 text-lg font-bold">
            Detail Mutasi
          </h2>

          <div className="overflow-auto border rounded max-h-[500px]">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
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
                {draftData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        10 + sizeFields.length
                      }
                      className="border p-4 text-center text-gray-500"
                    >
                      Tidak ada data mutasi in
                    </td>
                  </tr>
                ) : (
                  draftData.map(
                    (
                      item,
                      index
                    ) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">
                          {type === "in" ? (
                                <input
                                type="checkbox"
                                checked={checkedDrafts.includes(index)}
                                onChange={() =>
                                    toggleDraftChecked(index)
                                }
                                />
                            ) : (
                                <input
                                type="checkbox"
                                checked={selectedDraft === index}
                                onChange={() =>
                                    setSelectedDraft(
                                    selectedDraft === index
                                        ? null
                                        : index
                                    )
                                }
                                />
                            )}
                        </td>

                        <td className="border p-2">
                          {item[2]}
                        </td>

                        <td className="border p-2">
                          {item[1]}
                        </td>

                        <td className="border p-2">
                          {item[5] || 0}
                        </td>

                        <td className="border p-2">
                          {item[35] || 0}
                        </td>

                        <td className="border p-2">
                          {item[36] || 0}
                        </td>

                        <td className="border p-2">
                          {item[41] || 0}%
                        </td>

                        <td className="border p-2">
                          {item[34] || 0}
                        </td>

                        <td className="border p-2">
                          {item[38] || 0}
                        </td>

                        <td className="border p-2">
                          {item[39] || 0}
                        </td>

                        {sizeFields.map(
                          (
                            size,
                            idx
                          ) => (
                            <td
                              key={`${size}-${idx}`}
                              className="border p-2 text-center"
                            >
                              {type === "in" ? (
                                <input
                                    type="number"
                                    className="w-16 rounded border px-1 py-0.5"
                                    value={
                                        editedDraft[index]?.[
                                            idx + 6
                                        ] || 0
                                    }
                                    min={0}
                                    disabled={
                                        !checkedDrafts.includes(index) ||
                                        (originalDraft[index]?.[
                                        idx + 6
                                        ] || 0) <= 0
                                    }
                                    onChange={(e) =>
                                        handleSizeChange(
                                            index,
                                            idx + 6,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            ) : (
                                <input
                                    type="number"
                                    className="w-16 rounded border px-1 py-0.5 bg-gray-100"
                                    value={
                                        editedDraft[index]?.[
                                            idx + 6
                                        ] || 0
                                    }
                                    disabled
                                    readOnly
                                />
                            )}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button
            onClick={onConfirm}
          >
            Konfirmasi
          </Button>
        </div>
      </div>
    </Modal>
  )
}