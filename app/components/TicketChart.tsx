"use client";

import { Card, Text } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

type ChartOpenTicket = {
  label: string;
  value: number;
};
interface Props {
  openTickets: ChartOpenTicket[];
}

const TicketChart = ({ openTickets }: Props) => {
  return (
    <>
      <Text className="text-center font-semibold" size="6">
        Open Tickets
      </Text>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={openTickets}>
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Bar
              dataKey="value"
              barSize={60}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default TicketChart;
