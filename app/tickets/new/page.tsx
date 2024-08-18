import dynamic from "next/dynamic";
import TicketFormSkeleton from "./loading";

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

export default CreateTicketPage;
