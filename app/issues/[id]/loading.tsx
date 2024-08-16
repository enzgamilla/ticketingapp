import { Card, Skeleton, Box, Flex } from "@radix-ui/themes";

const TicketDetailedLoadingPage = () => {
  const skeletonCount = [1, 2, 3, 4, 5];
  return (
    <Flex direction={{ initial: "column", sm: "row" }} justify="center" gap="7">
      <Box className="max-w-xl" width={{ initial: "100%", sm: "70%" }}>
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
      <Box width={{ initial: "10rem" }}>
        <Flex direction="column" gap="2">
          <Skeleton width="5rem" />
          <Skeleton width="5rem" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default TicketDetailedLoadingPage;
