import DataTableImport from "react-data-table-component"
import type { TableColumn } from "react-data-table-component"

const DataTable =
  (DataTableImport as any).default?.default ||
  (DataTableImport as any).default ||
  DataTableImport

type StokRow = {
  fv_barcode?: string
  fv_catname?: string
  fv_divname?: string
  fv_configname?: string
  fv_namemark?: string
  status?: string
  Ornal?: string
  fv_rating?: string
  fv_status?: string
  fv_ket_table?: string
  aging?: string | number

  stockAwal?: number | string
  sales?: number | string
  SalesThru?: number | string
  sumQty?: number | string

  retur?: number | string
  Mutasi?: number | string
  fn_qty?: number | string

  MI?: number | string
  RT?: number | string
  MO?: number | string
  OB?: number | string

  stocks_req_mutasi_in?: number | string
  stocks_req_retur?: number | string
  stocks_req_mutasi_out?: number | string

  OstOB?: number | string
  OstDO?: number | string
  OstDM?: number | string

  stockfuture?: number | string

  [key: string]: any
}

type Props = {
  data: StokRow[]
  loading?: boolean

  onRetur?: (row: StokRow) => void
  onMutasiIn?: (row: StokRow) => void
  onMutasiOut?: (row: StokRow) => void
  onOrderBooking?: (row: StokRow) => void
}

const numberFormat = (
  value: number | string | undefined
) =>
  new Intl.NumberFormat("id-ID").format(
    Number(value || 0)
  )

const renderColoredValue = (
  value: number | string | undefined
) => {
  const num = Number(value || 0)

  return (
    <span
      className={
        num < 0
          ? "font-semibold text-red-500"
          : ""
      }
    >
      {numberFormat(num)}
    </span>
  )
}

export default function StokTableBedahCounter({
  data,
  loading,
  onRetur,
  onMutasiIn,
  onMutasiOut,
  onOrderBooking,
}: Props) {
  const sizeColumns = [
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

  const columns: TableColumn<StokRow>[] = [
    {
      name: "Action",
      width: "320px",
      cell: (row) => {
        const sumQty = Number(row.sumQty || 0)
        const disabled = sumQty < 1

        return (
          <div className="flex gap-2 py-1">
            <button
              disabled={disabled}
              onClick={() => onRetur?.(row)}
              className="rounded bg-green-600 px-2 py-1 text-xs text-white disabled:opacity-50"
            >
              Retur
            </button>

            <button
              onClick={() => onMutasiIn?.(row)}
              className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
            >
              Mutasi In
            </button>

            <button
              disabled={disabled}
              onClick={() => onMutasiOut?.(row)}
              className="rounded bg-yellow-500 px-2 py-1 text-xs text-white disabled:opacity-50"
            >
              Mutasi Out
            </button>

            <button
              onClick={() =>
                onOrderBooking?.(row)
              }
              className="rounded bg-red-600 px-2 py-1 text-xs text-white"
            >
              Order Booking
            </button>
          </div>
        )
      },
    },

    {
      name: "Nama Artikel",
      selector: (row) =>
        row.fv_barcode || "-",
      width: "220px",
    },

    {
      name: "Kategori",
      selector: (row) =>
        row.fv_catname || "-",
      width: "180px",
    },

    {
      name: "Divisi",
      selector: (row) =>
        row.fv_divname || "-",
      width: "180px",
    },

    {
      name: "TOP / BOT",
      selector: (row) =>
        row.fv_configname || "-",
      width: "120px",
    },

    {
      name: "Acara",
      selector: (row) =>
        row.fv_namemark || "-",
      width: "160px",
    },

    {
      name: "Keterangan",
      selector: (row) =>
        row.status || "-",
      width: "160px",
    },

    {
      name: "Obral / Normal",
      selector: (row) =>
        row.Ornal || "-",
      width: "150px",
    },

    {
      name: "Rating",
      selector: (row) =>
        row.fv_rating || "-",
      width: "100px",
    },

    {
      name: "Status",
      selector: (row) =>
        row.fv_status || "-",
      width: "120px",
    },

    {
      name: "Keterangan Tabel",
      selector: (row) =>
        row.fv_ket_table || "-",
      width: "180px",
    },

    {
      name: "Aging",
      selector: (row) => row.aging || 0,
      width: "100px",
    },

    {
      name: "Stok Awal",
      cell: (row) =>
        numberFormat(row.stockAwal),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Total Sales",
      cell: (row) =>
        numberFormat(row.sales),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Sales Thru(%)",
      cell: (row) =>
        numberFormat(row.SalesThru),
      style: {
        justifyContent: "flex-end",
      },
      width: "140px",
    },

    {
      name: "Stock Akhir",
      cell: (row) =>
        numberFormat(row.sumQty),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Retur",
      cell: (row) =>
        numberFormat(row.retur),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Mutasi",
      cell: (row) =>
        numberFormat(row.Mutasi),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "FS Gudang",
      cell: (row) =>
        numberFormat(row.fn_qty),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Draft MI",
      cell: (row) =>
        numberFormat(row.MI),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Draft Retur",
      cell: (row) =>
        numberFormat(row.RT),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Draft MO",
      cell: (row) =>
        numberFormat(row.MO),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Draft OB",
      cell: (row) =>
        numberFormat(row.OB),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Req MI",
      cell: (row) =>
        numberFormat(
          row.stocks_req_mutasi_in
        ),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Req Retur",
      cell: (row) =>
        numberFormat(
          row.stocks_req_retur
        ),
      style: {
        justifyContent: "flex-end",
      },
      width: "120px",
    },

    {
      name: "Req MO",
      cell: (row) =>
        numberFormat(
          row.stocks_req_mutasi_out
        ),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "OTS OB",
      cell: (row) =>
        numberFormat(row.OstOB),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "OTS DO",
      cell: (row) =>
        numberFormat(row.OstDO),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "OTS DM",
      cell: (row) =>
        numberFormat(row.OstDM),
      style: {
        justifyContent: "flex-end",
      },
      width: "100px",
    },

    {
      name: "Stock Akhir Future",
      cell: (row) =>
        numberFormat(row.stockfuture),
      style: {
        justifyContent: "flex-end",
      },
      width: "180px",
    },

    ...sizeColumns.map((size) => ({
      name: size,
      cell: (row: StokRow) =>
        renderColoredValue(row[size]),
      width: "90px",
      style: {
        justifyContent: "flex-end",
      },
    })),
  ]

  const conditionalRowStyles = [
    {
      when: (row: StokRow) => {
        const mi =
          Number(row.MI || 0) +
          Number(
            row.stocks_req_mutasi_in || 0
          )

        const rt =
          Number(row.RT || 0) +
          Number(
            row.stocks_req_retur || 0
          )

        const mo =
          Number(row.MO || 0) +
          Number(
            row.stocks_req_mutasi_out || 0
          )

        const ob =
          Number(row.OB || 0) +
          Number(row.OstOB || 0)

        return (
          [mi, rt, mo, ob].filter(
            (v) => v > 0
          ).length > 2
        )
      },

      style: {
        backgroundColor: "#e5e7eb",
      },
    },

    {
      when: (row: StokRow) =>
        Number(row.RT || 0) > 0,

      style: {
        backgroundColor: "#fecaca",
      },
    },

    {
      when: (row: StokRow) =>
        Number(row.MI || 0) > 0,

      style: {
        backgroundColor: "#bbf7d0",
      },
    },

    {
      when: (row: StokRow) =>
        Number(row.MO || 0) > 0,

      style: {
        backgroundColor: "#fde68a",
      },
    },

    {
      when: (row: StokRow) =>
        Number(row.OB || 0) > 0,

      style: {
        backgroundColor: "#bfdbfe",
      },
    },
  ]

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">
        Stok Artikel dan Size
      </h2>

      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        responsive
        striped
        highlightOnHover
        dense
        fixedHeader
        fixedHeaderScrollHeight="650px"
        conditionalRowStyles={
          conditionalRowStyles
        }
      />
    </div>
  )
}