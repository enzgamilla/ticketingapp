"use client";

import React, { useState, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";
import {} from "@radix-ui/react-icons";
import { SiPivotaltracker } from "react-icons/si";
import { Flex, Text } from "@radix-ui/themes";

const LoadingLogo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return oldProgress;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      className="h-screen "
    >
      <SiPivotaltracker className="size-10" /> {/* Logo instead of icon */}
      <Text className="text-sm">Loading, please wait...</Text>
      <Progress.Root
        className="relative w-64 h-3 bg-gray-200 rounded-full overflow-hidden"
        value={progress}
      >
        <Progress.Indicator
          className="h-full bg-blue-500 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      <p className="text-sm text-gray-500">{progress}%</p>
    </Flex>
  );
};

export default LoadingLogo;
