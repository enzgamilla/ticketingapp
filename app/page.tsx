import { Card } from "@radix-ui/themes";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Card className="bg-white">
      <h1 className="font-semibold text-2xl">Home Page</h1>
    </Card>
  );
}
