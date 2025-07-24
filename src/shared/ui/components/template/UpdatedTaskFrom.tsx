"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "../atoms/InputText";
import { useModal } from "@/shared/ui/context/ModalContext";
import { IResponseUserDetail } from "@/shared/lib/interfaces/users.interfaces";
import { AsyncSelectController } from "../organism/AsyncSelectController";
import { useReadClassMemberByUserId } from "@/shared/lib/services/classMembers/hooks";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { IClassMemberByUserId } from "@/shared/lib/interfaces/class-members.interface";
import { InputTextArea } from "../atoms/InputTextArea";
import { InputFileController } from "../atoms/InputFileController";
import { InputDateController } from "../organism/InputDateController";
import {
  useDeletedTask,
  useReadTaskById,
  useUpdatedTask,
} from "@/shared/lib/services/tasks/hooks";
import { IRequestUpdateTask } from "@/shared/lib/interfaces/tasks.interfaces";
import Button from "../atoms/Button";
import DeletedModalNotification from "./DeletedModalNotification";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  class_id: z.object({
    label: z.string(),
    value: z.string(),
  }),
  media: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File tidak boleh kosong")
    .optional(),
  due_date: z
    .date({
      required_error: "Tanggal wajib diisi",
      invalid_type_error: "Format tanggal tidak valid",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // hilangkan jam
        return date >= today;
      },
      {
        message: "Tanggal tidak boleh di bawah hari ini",
      }
    ),
});

type FormData = z.infer<typeof formSchema>;

interface UpdatedTaskFormProps {
  refetch: () => void;
  profile: IResponseUserDetail;
  id: string;
}

export const UpdatedTaskForm = ({
  refetch,
  profile,
  id,
}: UpdatedTaskFormProps) => {
  const { showModal, hideModal } = useModal();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data: classesData } = useReadClassMemberByUserId({
    activeFilter: { search: debouncedSearch },
    userId: profile?.id,
  });

  const clasess = classesData?.data;

  const loadOptions = async (inputValue: string) => {
    setSearch(inputValue);

    return (
      clasess?.data?.map((item: IClassMemberByUserId) => ({
        label: item?.name,
        value: item?.id,
      })) || []
    );
  };

  const { mutations: taskMutations } = useUpdatedTask({
    refetch: refetch,
    id: id,
  });

  const { mutations: mutationDeletedTask } = useDeletedTask({ refetch });

  const { data: getTaskById } = useReadTaskById({
    activeFilter: { search: "" },
    id: id,
  });

  const TaskById = getTaskById?.data;

  const onSubmit = async (data: FormData) => {
    const payload: IRequestUpdateTask = {
      ...data,
      class_id: data?.class_id?.value,
      due_date: data.due_date.toISOString().slice(0, 19).replace("T", " "),
    };
    await taskMutations.mutateAsync(payload);
    hideModal();
  };

  const onDeleted = async () => {
    await mutationDeletedTask.mutateAsync(id);
    hideModal();
  };

  const handleModalDeleted = () => {
    showModal(
      <DeletedModalNotification
        title="Are you sure you want to delete this class?"
        onCancel={hideModal}
        onConfirm={onDeleted}
      />
    );
  };

  useEffect(() => {
    setValue("name", TaskById?.name);
    setValue("description", TaskById?.description);
    setValue("class_id", {
      label: TaskById?.class?.name,
      value: TaskById?.class?.id,
    });
    if (TaskById?.due_date) {
      setValue("due_date", new Date(TaskById.due_date));
    }
  }, [TaskById, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Updated Task</h2>

      <InputText
        label="Task Name"
        placeholder="e.g., Matematika"
        register={register("name")}
        error={errors.name}
      />

      <AsyncSelectController
        name="class_id"
        label="Select Classes"
        placeholder="Choose one..."
        loadOptions={loadOptions}
        control={control}
      />

      <InputTextArea
        label="Description"
        placeholder="e.g., Matematika"
        register={register("description")}
        error={errors.description}
      />

      <InputFileController
        name="media"
        label="Upload Media (Optional)"
        control={control}
        error={errors.media}
      />

      <InputDateController
        name="due_date"
        label="Due Date"
        control={control}
        error={errors.due_date}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          onClick={handleModalDeleted}
          styles="bg-red-500 text-white hover:bg-red-700"
        >
          Delete
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          styles="bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Updated..." : "Updated"}
        </Button>
      </div>
    </form>
  );
};
