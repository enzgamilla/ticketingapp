import prisma from "@/prisma/client";
import React from "react";
import UpdateSiteForm from "./UpdateSiteForm";

const NewSitePage = async ({ params }: { params: { id: string } }) => {
  const siteDetails = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return <UpdateSiteForm site={siteDetails!} />;
};

export default NewSitePage;
