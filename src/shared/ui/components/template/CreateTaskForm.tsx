"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "../atoms/InputText";
import { useModal } from "@/shared/ui/context/ModalContext";
import { IResponseUserDetail } from "@/shared/lib/interfaces/users.interfaces";
import { AsyncSelectController } from "../organism/AsyncSelectController";
import { useReadClassMemberByUserId } from "@/shared/lib/services/classMembers/hooks";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { IClassMemberByUserId } from "@/shared/lib/interfaces/class-members.interface";
import { InputTextArea } from "../atoms/InputTextArea";
import { InputFileController } from "../atoms/InputFileController";
import { InputDateController } from "../organism/InputDateController";
import { useCreateTask } from "@/shared/lib/services/tasks/hooks";
import { IRequestCreateTask } from "@/shared/lib/interfaces/tasks.interfaces";

const formSchema = z.object({
  name: z.string().min(3, "Nama kelas minimal 3 karakter"),
  description: z.string().min(1, "Deskripsi tugas minimal 1 karakter"),
  class_id: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { required_error: "Harap pilih kelas" }
  ),
  media: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File tidak boleh kosong")
    .optional(), // optional jika tidak wajib
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

interface CreateTaskFormProps {
  refetch: () => void;
  profile: IResponseUserDetail;
}

export const CreateTaskForm = ({ refetch, profile }: CreateTaskFormProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { hideModal } = useModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data: classesData } = useReadClassMemberByUserId({
    activeFilter: { search: debouncedSearch },
    userId: profile?.id,
  });

  const loadOptions = async (inputValue: string) => {
    setSearch(inputValue);

    return (
      classesData?.data?.map((item: IClassMemberByUserId) => ({
        label: item?.name,
        value: item?.id,
      })) || []
    );
  };

  const { mutations: taskMutations } = useCreateTask({ refetch: refetch });

  const onSubmit = async (data: FormData) => {
    const payload: IRequestCreateTask = {
      ...data,
      class_id: data?.class_id?.value,
      due_date: data.due_date.toISOString().slice(0, 19).replace("T", " "),
    };
    await taskMutations.mutateAsync(payload);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Create New Task</h2>

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
        <button
          type="button"
          onClick={hideModal}
          className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};
