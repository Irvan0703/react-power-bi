import { useMemo, useState } from "react";
import * as DataTableModule from "react-data-table-component";

const DataTable =
  (DataTableModule as any).default?.default ||
  (DataTableModule as any).default ||
  DataTableModule;

type Props = {
  data: any[];
};

export default function ProductTable({ data }: Props) {
  const mappedData = useMemo(() => {
    return data.map((row: any, index: number) => {
      const totalSales = Number(row[47]) || 0;
      const stockAwal = Number(row[49]) || 0;

      return {
        id: index,

        artikel: row[2],
        toko: row[1],
        kategori: row[3],
        brand: row[4],
        divisi: row[8],
        topbot: row[5],
        acara: row[6],
        gross: row[7],
        rating: row[9],
        color: row[13],
        keterangan: row[43],
        status_produksi: row[60],
        ornal: row[45],
        st_do: row[10],
        qty_1st_do: row[14],
        last_receive: row[11],
        aging: row[12],

        stock_awal: stockAwal,
        total_sales: totalSales,

        sales_thru:
          stockAwal > 0
            ? ((totalSales / stockAwal) * 100).toFixed(0)
            : 0,

        stock_akhir: row[44],
        stock_future: row[59],

        ots_do: row[52],
        ots_dm: row[57],
        hs_retur: row[50],
        hs_mutasi: row[51],

        qty_ob: row[55],
        qty_do: row[57],

        tgl_ob: row[54],
        tgl_do: row[56],

        size_25: row[15],
        size_26: row[16],
        size_27: row[17],
        size_28: row[18],
        size_29: row[19],
        size_30: row[20],
        size_31: row[21],
        size_32: row[22],
        size_33: row[23],
        size_34: row[24],
        size_35: row[25],
        size_36: row[26],
        size_37: row[27],
        size_38: row[28],
        size_39: row[29],
        size_40: row[30],
        size_42: row[31],
        size_44: row[32],

        all_size: row[33],
        fs: row[34],
        xs: row[35],
        ss: row[36],
        s: row[37],
        m: row[38],
        l: row[39],
        xl: row[40],
        xxl: row[41],
        xxxl: row[42],

        jumlah_stock: row[44],

        checked: false,
      };
    });
  }, [data]);

  const [tableData, setTableData] = useState(mappedData);

  const handleChange = (
    rowIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...tableData];

    updated[rowIndex] = {
      ...updated[rowIndex],
      [field]: value,
    };

    setTableData(updated);
  };

  const handleCheckAll = (checked: boolean) => {
    const updated = tableData.map((item) => ({
      ...item,
      checked,
    }));

    setTableData(updated);
  };

  const columns: any = [
    {
      name: (
        <input
          type="checkbox"
          onChange={(e) => handleCheckAll(e.target.checked)}
        />
      ),
      width: "70px",
      cell: (row: any, index: number) => (
        <input
          type="checkbox"
          checked={row.checked}
          onChange={(e) =>
            handleChange(index, "checked", e.target.checked)
          }
        />
      ),
    },

    {
      name: "Artikel",
      selector: (row: any) => row.artikel,
      sortable: true,
      minWidth: "160px",
    },

    {
      name: "Toko",
      selector: (row: any) => row.toko,
      minWidth: "120px",
    },

    {
      name: "Kategori",
      selector: (row: any) => row.kategori,
      minWidth: "160px",
    },

    {
      name: "Brand",
      selector: (row: any) => row.brand,
      minWidth: "150px",
    },

    {
      name: "Divisi",
      selector: (row: any) => row.divisi,
      minWidth: "150px",
    },

    {
      name: "TOP / BOT",
      selector: (row: any) => row.topbot,
    },

    {
      name: "Acara",
      selector: (row: any) => row.acara,
    },

    {
      name: "Gross",
      selector: (row: any) => row.gross,
    },

    {
      name: "Rating",
      selector: (row: any) => row.rating,
    },

    {
      name: "Color",
      selector: (row: any) => row.color,
    },

    {
      name: "Keterangan",
      selector: (row: any) => row.keterangan,
      minWidth: "180px",
    },

    {
      name: "Status Produksi",
      selector: (row: any) => row.status_produksi,
      minWidth: "180px",
    },

    {
      name: "Obral / Normal",
      selector: (row: any) => row.ornal,
    },

    {
      name: "1st DO",
      selector: (row: any) => row.st_do,
    },

    {
      name: "Qty 1st DO",
      selector: (row: any) => row.qty_1st_do,
    },

    {
      name: "Last Receive",
      selector: (row: any) => row.last_receive,
    },

    {
      name: "Aging (Hari)",
      selector: (row: any) => row.aging,
    },

    {
      name: "Stock Awal",
      selector: (row: any) => row.stock_awal,
    },

    {
      name: "Total Sales",
      selector: (row: any) => row.total_sales,
    },

    {
      name: "Sales Thru (%)",
      cell: (row: any) => `${row.sales_thru}%`,
    },

    {
      name: "Stock Akhir",
      selector: (row: any) => row.stock_akhir,
    },

    {
      name: "Stock Future",
      selector: (row: any) => row.stock_future,
    },

    {
      name: "25",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_25}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_25", e.target.value)
          }
        />
      ),
      width: "90px",
    },

    {
      name: "26",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_26}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_26", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "27",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_27}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_27", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "28",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_28}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_28", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "29",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_29}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_29", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "30",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_30}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_30", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "31",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_31}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_31", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "32",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_32}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_32", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "33",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_33}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_33", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "34",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_34}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_34", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "35",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_35}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_35", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "36",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_36}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_36", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "37",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_37}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_37", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "38",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_38}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_38", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "39",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_39}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_39", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "40",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_40}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_40", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "42",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_42}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_42", e.target.value)
          }
        />
      ),
      width: "90px",
    },
    {
      name: "44",
      cell: (row: any, index: number) => (
        <input
          type="number"
          value={row.size_44}
          className="form-control form-control-sm"
          onChange={(e) =>
            handleChange(index, "size_44", e.target.value)
          }
        />
      ),
      width: "90px",
    },
  ];

  return (
    <div className="table-responsive bg-white p-3 shadow rounded">
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        dense
        responsive
        highlightOnHover
        striped
      />
    </div>
  );
}