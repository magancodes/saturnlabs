import { getSampleById, samples } from "@/lib/samples";
import { notFound } from "next/navigation";
import SampleDetailClient from "@/components/samples/sample-detail-client";

export function generateStaticParams() {
  return samples.map((sample) => ({
    id: sample.id,
  }));
}

export default async function SampleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sample = getSampleById(id);

  if (!sample) {
    notFound();
  }

  return <SampleDetailClient sample={sample} />;
}
