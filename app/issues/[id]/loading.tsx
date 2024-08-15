import { Card, Skeleton, Box } from "@radix-ui/themes";

const TicketDetailedLoadingPage = () => {
  const skeletonCount = [1, 2, 3, 4, 5];
  return (
    <Box className="max-w-xl">
      <div className="prose space-y-2">
        <Skeleton width="10rem" />
        <div className="flex justify-between">
          <Skeleton width="5rem" />
          <Skeleton width="5rem" />
        </div>
      </div>
      <Card className="prose" mt="5">
        {skeletonCount.map((skeleton) => (
          <Skeleton key={skeleton} className="mb-2" />
        ))}
      </Card>
    </Box>
  );
};

export default TicketDetailedLoadingPage;
