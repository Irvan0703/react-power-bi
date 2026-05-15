type Props = {
  storeName: string;
  date: string;
};

export default function StoreHeader({ storeName, date }: Props) {
  return (
    <div>
      <h5 className="fw-bold text-primary">{storeName}</h5>
      <small className="text-muted">Tanggal Stok: {date}</small>
    </div>
  );
}