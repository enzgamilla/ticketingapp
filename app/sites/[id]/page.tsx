import prisma from "@/prisma/client";
import React from "react";
import UpdateSiteForm from "./UpdateSiteForm";

const UpdateSitePage = async ({ params }: { params: { id: string } }) => {
  const siteDetails = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return <UpdateSiteForm site={siteDetails!} />;
};

export default UpdateSitePage;
