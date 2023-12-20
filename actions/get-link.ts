import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";

export const getLink = async (linkId: string) => {
  const session = await auth();

  if (session) {
    const link = await prismadb.link.findUnique({
      where: {
        id: linkId,
        userId: session.user?.id,
      },
    });

    if (!link) {
      notFound();
    }

    return link;
  }
  return notFound();
};
