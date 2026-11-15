import { notFound } from "next/navigation";
import { getModule } from "@/lib/courseData";
import ModuleLearnClient from "@/components/course/ModuleLearnClient";

import { Suspense } from "react";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const module = getModule(Number(moduleId));
  if (!module) notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModuleLearnClient module={module} />
    </Suspense>
  );
}
