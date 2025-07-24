"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "../atoms/InputText"; // pastikan path-nya sesuai
import { useModal } from "@/shared/ui/context/ModalContext";
import { IRequestUpdateClass } from "@/shared/lib/interfaces/classes.interface";
import {
  useDeletedClass,
  useReadClassesById,
  useUpdatedClass,
} from "@/shared/lib/services/class/hooks";
import Button from "../atoms/Button";
import { useEffect } from "react";
import DeletedModalNotification from "./DeletedModalNotification";

const schema = z.object({
  name: z.string().min(3, "Nama kelas minimal 3 karakter"),
});

type FormData = z.infer<typeof schema>;

interface updatedClassFormProps {
  refetch: () => void;
  id?: string;
}

export const UpdatedClassForm = ({ refetch, id }: updatedClassFormProps) => {
  const { showModal, hideModal } = useModal();

  const activeFilter = {
    search: "",
  };

  const { data: getClassId } = useReadClassesById({ activeFilter, id });

  const classById = getClassId?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("name", classById?.name);
  }, [classById, setValue]);

  const { mutations: updatedClassMutations } = useUpdatedClass({ id, refetch });
  const { mutations: mutationDeletedClass } = useDeletedClass({ refetch });

  const onDeleted = async () => {
    await mutationDeletedClass.mutateAsync(id);
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

  const onSubmit = async (data: IRequestUpdateClass) => {
    await updatedClassMutations.mutateAsync(data);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Updated Or Delete Class</h2>

      <InputText
        label="Class Name"
        placeholder="e.g., Matematika"
        register={register("name")}
        error={errors.name}
      />

      <div className="flex justify-between gap-2 pt-2">
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
