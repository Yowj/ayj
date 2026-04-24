import { redirect } from "next/navigation";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/anime/${id}/watch/1`);
}
