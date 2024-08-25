import dynamic from "next/dynamic";
import TicketFormSkeleton from "./loading";
import { Metadata } from "next";

const TicketForm = dynamic(
  () => import("@/app/tickets/_components/TicketForm"),
  {
    ssr: false,
    loading: () => <TicketFormSkeleton />,
  }
);

const CreateTicketPage = () => {
  return (
    <div>
      <TicketForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Ticketing App - Add new ticket",
  description: "Create a new ticket",
};

export default CreateTicketPage;
