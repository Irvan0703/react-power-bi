import DataTableImport from "react-data-table-component"
import type { TableColumn } from "react-data-table-component"

const DataTable =
  (DataTableImport as any).default?.default ||
  (DataTableImport as any).default ||
  DataTableImport

type HistoryRow = {
  fv_catname?: string

  "Stock Awal"?: number | string
  "Total Stock"?: number | string
  "Sales (pcs)"?: number | string
  "Sales (Rp)"?: number | string
  "Kontribusi Sales"?: number | string
  "Kontribusi pcs"?: number | string
  "Sales Thru"?: number | string
  "Stock Akhir"?: number | string
  "Kontribusi Stock"?: number | string
  "Jumlah Artikel"?: number | string

  "broken pcs"?: number | string
  "sehat pcs"?: number | string

  SOH?: number | string
  BROKEN?: number | string
  SEHAT?: number | string
  ART?: number | string

  topbot?: string

  "stock ideal art"?: number | string
  "stock per art"?: number | string
  "stock ideal pcs"?: number | string

  "O/U ART"?: number | string
  "O/U PCS"?: number | string
}

type Props = {
  title?: string
  data: HistoryRow[]
  selectedRow: HistoryRow | null
  onSelectRow: (row: HistoryRow) => void
}

const toNumber = (
  value: number | string | undefined
) => {
  if (value === undefined || value === null)
    return 0

  const parsed = Number(value)

  return isNaN(parsed) ? 0 : parsed
}

const numberFormat = (
  value: number | string | undefined
) =>
  new Intl.NumberFormat("id-ID").format(
    toNumber(value)
  )

const percentFormat = (
  value: number | string | undefined
) => `${toNumber(value).toFixed(2)}%`

export default function HistoryTable({
  title,
  data,
  selectedRow,
  onSelectRow,
}: Props) {
  const columns: TableColumn<HistoryRow>[] = [
    {
      id: "select",
      name: "",
      cell: (row) => (
        <input
          type="checkbox"
          checked={
            selectedRow?.fv_catname === row.fv_catname
          }
          onChange={() => onSelectRow(row)}
        />
      ),
      width: "70px",
    },

    {
      name: "Kategori",
      selector: (row) => row.fv_catname || "-",
      sortable: true,
      width: "180px",
    },

    {
      name: "Stok Awal",
      selector: (row) =>
        toNumber(row["Stock Awal"]),
      cell: (row) =>
        numberFormat(row["Stock Awal"]),
      
    },

    {
      name: "Total Stok",
      selector: (row) =>
        toNumber(row["Total Stock"]),
      cell: (row) =>
        numberFormat(row["Total Stock"]),
      
    },

    {
      name: "Sales (pcs)",
      selector: (row) =>
        toNumber(row["Sales (pcs)"]),
      cell: (row) =>
        numberFormat(row["Sales (pcs)"]),
      
    },

    {
      name: "Sales (Rp)",
      selector: (row) =>
        toNumber(row["Sales (Rp)"]),
      cell: (row) =>
        numberFormat(row["Sales (Rp)"]),
      
    },

    {
      name: "Price Point",
      cell: (row) => {
        const pcs = toNumber(
          row["Sales (pcs)"]
        )

        const rp = toNumber(
          row["Sales (Rp)"]
        )

        const pricePoint =
          pcs > 0 ? rp / pcs : 0

        return numberFormat(pricePoint)
      },
      
    },

    {
      name: "Kontribusi Sales (Rp)",
      selector: (row) =>
        toNumber(row["Kontribusi Sales"]),
      cell: (row) =>
        percentFormat(
          row["Kontribusi Sales"]
        ),
      
    },

    {
      name: "Kontribusi Sales (pcs)",
      selector: (row) =>
        toNumber(row["Kontribusi pcs"]),
      cell: (row) =>
        percentFormat(row["Kontribusi pcs"]),
      
    },

    {
      name: "Sales Thru",
      selector: (row) =>
        toNumber(row["Sales Thru"]),
      cell: (row) =>
        numberFormat(row["Sales Thru"]),
      
    },

    {
      name: "Stok Akhir",
      selector: (row) =>
        toNumber(row["Stock Akhir"]),
      cell: (row) =>
        numberFormat(row["Stock Akhir"]),
      
    },

    {
      name: "Kontribusi Stok",
      selector: (row) =>
        toNumber(row["Kontribusi Stock"]),
      cell: (row) =>
        percentFormat(
          row["Kontribusi Stock"]
        ),
      
    },

    {
      name: "Jumlah Artikel",
      selector: (row) =>
        toNumber(row["Jumlah Artikel"]),
      cell: (row) =>
        numberFormat(
          row["Jumlah Artikel"]
        ),
      
    },

    {
      name: "Broken pcs",
      selector: (row) =>
        toNumber(row["broken pcs"]),
      cell: (row) =>
        numberFormat(row["broken pcs"]),
      
    },

    {
      name: "Sehat pcs",
      selector: (row) =>
        toNumber(row["sehat pcs"]),
      cell: (row) =>
        numberFormat(row["sehat pcs"]),
      
    },

    {
      name: "Total Stock Saat Ini",
      selector: (row) => toNumber(row.SOH),
      cell: (row) => numberFormat(row.SOH),
      
    },

    {
      name: "Broken art",
      selector: (row) =>
        toNumber(row.BROKEN),
      cell: (row) =>
        numberFormat(row.BROKEN),
      
    },

    {
      name: "Sehat art",
      selector: (row) =>
        toNumber(row.SEHAT),
      cell: (row) =>
        numberFormat(row.SEHAT),
      
    },

    {
      name: "Total ART Saat Ini",
      selector: (row) => toNumber(row.ART),
      cell: (row) => numberFormat(row.ART),
      
    },

    {
      name: "Top / Bottom",
      selector: (row) => row.topbot || "",
      
      width: "120px",
    },

    {
      name: "Stok ideal artikel",
      selector: (row) =>
        toNumber(row["stock ideal art"]),
      cell: (row) =>
        numberFormat(
          row["stock ideal art"]
        ),
      
    },

    {
      name: "Stok per artikel",
      selector: (row) =>
        toNumber(row["stock per art"]),
      cell: (row) =>
        numberFormat(
          row["stock per art"]
        ),
      
    },

    {
      name: "Stok ideal pcs",
      selector: (row) =>
        toNumber(row["stock ideal pcs"]),
      cell: (row) =>
        numberFormat(
          row["stock ideal pcs"]
        ),
      
    },

    {
      name: "Over / Under Artikel",
      cell: (row) => {
        const value = toNumber(
          row["O/U ART"]
        )

        return (
          <span
            className={
              value < 0
                ? "font-semibold text-red-500"
                : ""
            }
          >
            {numberFormat(value)}
          </span>
        )
      },
      
    },

    {
      name: "Over / Under pcs",
      cell: (row) => {
        const value = toNumber(
          row["O/U PCS"]
        )

        return (
          <span
            className={
              value < 0
                ? "font-semibold text-red-500"
                : ""
            }
          >
            {numberFormat(value)}
          </span>
        )
      },
      
    },
  ]

  return (
    <div className="space-y-3">
      {title && (
        <h2 className="text-lg font-bold">
          {title}
        </h2>
      )}

      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        striped
        highlightOnHover
        dense
        fixedHeader
        fixedHeaderScrollHeight="600px"
      />
    </div>
  )
}