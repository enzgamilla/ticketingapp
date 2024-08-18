import { Box, Skeleton } from "@radix-ui/themes";
import React from "react";

const TicketFormSkeleton = () => {
  return (
    <div className="flex justify-center pt-7">
      <div className="w-[50rem]">
        <Box className="max-w-xl">
          <Skeleton mb="4" height="2rem" />
          <Skeleton mb="4" height="20rem" />
          <Skeleton width="7rem" height="2rem" />
        </Box>
      </div>
    </div>
  );
};

export default TicketFormSkeleton;
