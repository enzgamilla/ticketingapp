import { Box, Skeleton } from "@radix-ui/themes";

const NewTicketLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton mb="4" height="2rem" />
      <Skeleton mb="4" height="20rem" />
      <Skeleton width="7rem" height="2rem" />
    </Box>
  );
};

export default NewTicketLoadingPage;
