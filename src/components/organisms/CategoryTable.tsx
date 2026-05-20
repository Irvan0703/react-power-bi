import DataTableImport from "react-data-table-component"
import type { TableColumn } from "react-data-table-component"

const DataTable =
  (DataTableImport as any).default?.default ||
  (DataTableImport as any).default ||
  DataTableImport

type CategoryRow = {
  fv_catname: string
  "Stock Awal": number
  "Total Stock"?: number
  "Sales (pcs)": number
  "Sales (Rp)": number
  "Kontribusi Sales"?: number
  "Sales Thru"?: number
  "Stock Akhir": number
  "Kontribusi Stock"?: number
  "Jumlah Artikel": number
  "Price Point OU"?: number
}

type Props = {
  title: string
  data: CategoryRow[]
  isOU?: boolean
}

const numberFormat = (value: number = 0) =>
  new Intl.NumberFormat("id-ID").format(value)

export default function CategoryTable({
  title,
  data,
  isOU = false,
}: Props) {
  const normalColumns: TableColumn<CategoryRow>[] = [
    {
      name: "Kategori",
      selector: (row) => row.fv_catname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Stok Awal",
      selector: (row) => row["Stock Awal"] || 0,
      format: (row) =>
        numberFormat(row["Stock Awal"]),
      
    },
    {
      name: "Total Stok",
      selector: (row) => row["Total Stock"] || 0,
      format: (row) =>
        numberFormat(row["Total Stock"] || 0),
      
    },
    {
      name: "Sales (pcs)",
      selector: (row) => row["Sales (pcs)"] || 0,
      format: (row) =>
        numberFormat(row["Sales (pcs)"]),
      
    },
    {
      name: "Sales (Rp)",
      selector: (row) => row["Sales (Rp)"] || 0,
      format: (row) =>
        numberFormat(row["Sales (Rp)"]),
      
    },
    {
      name: "Price Point",
      selector: (row) => {
        const pcs = row["Sales (pcs)"] || 0
        const rp = row["Sales (Rp)"] || 0

        return pcs > 0 ? rp / pcs : 0
      },
      format: (row) => {
        const pcs = row["Sales (pcs)"] || 0
        const rp = row["Sales (Rp)"] || 0

        const pp = pcs > 0 ? rp / pcs : 0

        return numberFormat(pp)
      },
      
    },
    {
      name: "Kontribusi Sales",
      selector: (row) =>
        row["Kontribusi Sales"] || 0,
      format: (row) =>
        `${Number(
          row["Kontribusi Sales"] || 0
        ).toFixed(2)}%`,
      
    },
    {
      name: "Sales Thru",
      selector: (row) => row["Sales Thru"] || 0,
      format: (row) =>
        Number(
          row["Sales Thru"] || 0
        ).toFixed(2),
      
    },
    {
      name: "Stok Akhir",
      selector: (row) => row["Stock Akhir"] || 0,
      format: (row) =>
        numberFormat(row["Stock Akhir"]),
      
    },
    {
      name: "Kontribusi Stok",
      selector: (row) =>
        row["Kontribusi Stock"] || 0,
      format: (row) =>
        `${Number(
          row["Kontribusi Stock"] || 0
        ).toFixed(2)}%`,
      
    },
    {
      name: "Jumlah Artikel",
      selector: (row) =>
        row["Jumlah Artikel"] || 0,
      format: (row) =>
        numberFormat(row["Jumlah Artikel"]),
      
    },
  ]

  const ouColumns: TableColumn<CategoryRow>[] = [
    {
      name: "Kategori",
      selector: (row) => row.fv_catname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Stok Awal",
      cell: (row) => (
        <span
          className={
            row["Stock Awal"] < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(row["Stock Awal"])}
        </span>
      ),
      
    },
    {
      name: "Sales (pcs)",
      cell: (row) => (
        <span
          className={
            row["Sales (pcs)"] < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(row["Sales (pcs)"])}
        </span>
      ),
      
    },
    {
      name: "Sales (Rp)",
      cell: (row) => (
        <span
          className={
            row["Sales (Rp)"] < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(row["Sales (Rp)"])}
        </span>
      ),
      
    },
    {
      name: "Price Point",
      cell: (row) => (
        <span
          className={
            (row["Price Point OU"] || 0) < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(
            row["Price Point OU"] || 0
          )}
        </span>
      ),
      
    },
    {
      name: "Stok Akhir",
      cell: (row) => (
        <span
          className={
            row["Stock Akhir"] < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(row["Stock Akhir"])}
        </span>
      ),
      
    },
    {
      name: "Jumlah Artikel",
      cell: (row) => (
        <span
          className={
            row["Jumlah Artikel"] < 0
              ? "text-red-500"
              : ""
          }
        >
          {numberFormat(
            row["Jumlah Artikel"]
          )}
        </span>
      ),
      
    },
  ]

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        {title}
      </h2>

      <DataTable
        columns={
          isOU ? ouColumns : normalColumns
        }
        data={data}
        pagination
        responsive
        striped
        highlightOnHover
        dense
      />
    </div>
  )
}