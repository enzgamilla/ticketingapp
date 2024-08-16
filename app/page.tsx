import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="bg-white">
      <h1 className="font-semibold text-2xl">Home Page</h1>
      <Pagination
        itemCount={22}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
