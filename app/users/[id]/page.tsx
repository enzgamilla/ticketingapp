import prisma from "@/prisma/client";
import UpdateUserForm from "./UpdateUserForm";

interface Props {
  params: {
    id: string;
  };
}

const UpdateUserPage = async ({ params }: Props) => {
  const getUser = await prisma.user.findUnique({ where: { id: params.id } });

  return <UpdateUserForm user={getUser!} />;
};

export default UpdateUserPage;
