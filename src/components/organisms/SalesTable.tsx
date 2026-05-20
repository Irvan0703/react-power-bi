import DataTableImport from "react-data-table-component"
import type { TableColumn } from "react-data-table-component"

const DataTable =
  (DataTableImport as any).default?.default ||
  (DataTableImport as any).default ||
  DataTableImport

type SalesRow = {
  bulan: string
  bulan_index?: number
  penjualan_2024: number
  penjualan_2025: number
  offer_under: number
  growth_percent: number
}

type Props = {
  data: SalesRow[]
}

const numberFormat = (
  value: number = 0
) =>
  new Intl.NumberFormat(
    "id-ID"
  ).format(value)

export default function SalesTable({
  data,
}: Props) {
  const columns: TableColumn<SalesRow>[] =
    [
      {
        name: "Bulan",
        selector: (row) =>
          row.bulan,
        sortable: true,
        sortFunction: (a, b) =>
          (a.bulan_index || 0) -
          (b.bulan_index || 0),
      },
      {
        name: "Penjualan Tahun Lalu",
        selector: (row) =>
            Number(row.penjualan_2024),
        format: (row) =>
            numberFormat(
            Number(row.penjualan_2024)
            ),
        
        },
        {
        name: "Penjualan Tahun Ini",
        selector: (row) =>
            Number(row.penjualan_2025),
        format: (row) =>
            numberFormat(
            Number(row.penjualan_2025)
            ),
        
        },
        {
        name: "Over / Under",
        cell: (row) => {
            const value = Number(
            row.offer_under
            )

            return (
            <span
                className={
                value < 0
                    ? "text-red-500"
                    : ""
                }
            >
                {numberFormat(value)}
            </span>
            )
        },
        selector: (row) =>
            Number(row.offer_under),
        sortable: true,
        
        },
        {
        name: "Growth (%)",
        cell: (row) => {
            const growth = Number(
            row.growth_percent
            )

            return (
            <span
                className={
                growth < 0
                    ? "text-red-500"
                    : ""
                }
            >
                {growth.toFixed(2)}%
            </span>
            )
        },
        selector: (row) =>
            Number(row.growth_percent),
        sortable: true,
        
        },
    ]

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        Sales Table
      </h2>

      <DataTable
        columns={columns}
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