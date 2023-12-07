export default function AssetDetail(props: { params: { slug: string[] } }) {
  const params = props.params;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Asset Detail Page</h1>
      <h3>Slug: {params.slug}</h3>
    </div>
  );
}
