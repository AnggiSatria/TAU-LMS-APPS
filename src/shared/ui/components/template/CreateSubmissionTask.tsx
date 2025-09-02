"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/shared/ui/context/ModalContext";
import { IResponseUserDetail } from "@/shared/lib/interfaces/users.interfaces";
import { useReadClassMemberByUserId } from "@/shared/lib/services/classMembers/hooks";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { InputTextArea } from "../atoms/InputTextArea";
import { InputFileController } from "../atoms/InputFileController";
import { useCreateTask } from "@/shared/lib/services/tasks/hooks";
import Button from "../atoms/Button";
import { IRequestCreateTaskSubmission } from "@/shared/lib/interfaces/task-submissions.interface";
import { useCreateTaskSubmission } from "@/shared/lib/services/task_submissions/hooks";

const formSchema = z.object({
  answer_text: z.string().min(1, "Masukkan Jawaban minimal 1 karakter"),
  answer_file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File tidak boleh kosong")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CreateSubmissionFormProps {
  refetch: () => void;
  taskId: string;
  userId: string;
}

export const CreateSubmissionForm = ({
  refetch,
  taskId,
  userId,
}: CreateSubmissionFormProps) => {
  const { hideModal } = useModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutations: taskSubmissionMutations } = useCreateTaskSubmission({
    refetch: refetch,
  });

  const onSubmit = async (data: FormData) => {
    const payload: IRequestCreateTaskSubmission = {
      task_id: taskId,
      user_id: userId,
      answer_text: data?.answer_text,
      answer_file: data?.answer_file,
    };
    await taskSubmissionMutations.mutateAsync(payload);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Create Submissions</h2>

      <InputTextArea
        label="Answer text"
        placeholder="Enter answer text"
        register={register("answer_text")}
        error={errors.answer_text}
      />

      <InputFileController
        name="answer_file"
        label="Answer Media"
        control={control}
        error={errors.answer_file}
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
