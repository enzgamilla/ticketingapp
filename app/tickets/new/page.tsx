import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import TicketForm from "../_components/TicketForm";

const NewTicketPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <TicketForm
        userId={session?.user.id}
        assignedSite={session?.user.siteCode}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Ticketing App - Add new ticket",
  description: "Create a new ticket",
};

export default NewTicketPage;
