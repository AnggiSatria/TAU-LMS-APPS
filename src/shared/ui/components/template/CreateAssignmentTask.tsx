"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/shared/ui/context/ModalContext";
import Button from "../atoms/Button";
import { IRequestCreateAssignment } from "@/shared/lib/interfaces/assignments.interface";
import { InputNumber } from "../atoms/InputNumber";
import { useCreateAssignment } from "@/shared/lib/services/assignments/hooks";
import dayjs from "dayjs";

const formSchema = z.object({
  score: z.number().min(1, "Masukkan score minimal 0 - 100"),
});

type FormData = z.infer<typeof formSchema>;

interface CreateAssignmentFormProps {
  refetch: () => void;
  taskId: string | null;
  userId: string;
}

export const CreateAssignmentForm = ({
  refetch,
  taskId,
  userId,
}: CreateAssignmentFormProps) => {
  const { hideModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutations: assignmentMutations } = useCreateAssignment({
    refetch: refetch,
  });

  const today = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const onSubmit = async (data: FormData) => {
    const payload: IRequestCreateAssignment = {
      task_id: taskId,
      user_id: userId,
      score: data?.score,
      submitted_at: today,
    };
    await assignmentMutations.mutateAsync(payload);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Create Assignment</h2>

      <InputNumber
        label="Score"
        placeholder="Enter score"
        register={register("score", { valueAsNumber: true })}
        error={errors.score}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          onClick={hideModal}
          styles="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          styles="bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Assigning..." : "Assign"}
        </Button>
      </div>
    </form>
  );
};
