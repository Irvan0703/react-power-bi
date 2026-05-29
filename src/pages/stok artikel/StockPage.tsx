import { useEffect, useState, useMemo } from "react";
import { fetchStok, fetchSumCategory } from "../../api/stok_dasboard";
import StoreHeader from "../../components/molecules/StoreHeader";
import StatsContainer from "../../components/molecules/StatsContainer";
import ProductTable from "../../components/organisms/ProductTable";
import SummaryTable from "../../components/organisms/SummaryTable";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function StockPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cat, setCat] = useState<any>(null);

  const params = useMemo(() => ({
    toko: searchParams.get("codeToko"),
    backdate: searchParams.get("backdate"),
    end: searchParams.get("sales_start"),
    start: searchParams.get("sales_end"),
    subid: searchParams.get("subid"),
  }), [searchParams]);

  useEffect(() => {
    if (!params.toko || !params.backdate) {
      navigate("/");
      return;
    }

    setLoading(true);

    fetchStok(params)
      .then(setData)
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));

    fetchSumCategory(params)
      .then(setCat)
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));

  }, [params, navigate]);
  

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const stats = [
    { label: "Total Sales", value: data?.totalSalesSum || 0 },
    { label: "Stock Akhir", value: data?.totalStockSum || 0 },
    { label: "Jumlah Artikel", value: data?.stockAboveZero || 0 },
  ];

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-3">
        Kembali
      </button>

      <StoreHeader
        storeName={data?.storeName}
        date={data?.backdate}
      />

      <StatsContainer stats={stats} />

      <SummaryTable data={cat?.data || []} />

      <ProductTable data={data?.data || []} />
    </div>
  );
}