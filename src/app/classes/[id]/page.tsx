// app/class/[id]/page.tsx
import ClassDetailClientPage from "@/shared/ui/components/template/ClassDetailClientPage";

interface Props {
  params: { id: string };
}

export default function ClassDetailPage({ params }: Props) {
  const classId = params.id;

  return <ClassDetailClientPage classId={classId} />;
}
