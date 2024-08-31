import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import TicketForm from "../_components/TicketForm";

const CreateTicketPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <TicketForm userId={session?.user.id} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Ticketing App - Add new ticket",
  description: "Create a new ticket",
};

export default CreateTicketPage;
