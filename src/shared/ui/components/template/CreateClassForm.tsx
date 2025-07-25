// components/forms/CreateClassForm.tsx
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "../atoms/InputText"; // pastikan path-nya sesuai
import { useModal } from "@/shared/ui/context/ModalContext";
import { IRequestCreateClass } from "@/shared/lib/interfaces/classes.interface";
import { useCreateClass } from "@/shared/lib/services/class/hooks";
import { useCreateClassMember } from "@/shared/lib/services/classMembers/hooks";
import { IResponseUserDetail } from "@/shared/lib/interfaces/users.interfaces";
import Button from "../atoms/Button";

const schema = z.object({
  name: z.string().min(3, "Nama kelas minimal 3 karakter"),
});

type FormData = z.infer<typeof schema>;

interface CreateClassFormProps {
  refetch: () => void;
  profile: IResponseUserDetail;
}

export const CreateClassForm = ({ refetch, profile }: CreateClassFormProps) => {
  const { hideModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutations: createClassMemberMutations } = useCreateClassMember({
    refetch,
  });

  const { mutations: createClassMutations } = useCreateClass();

  const onSubmit = async (data: IRequestCreateClass) => {
    const responseClassMutations = await createClassMutations.mutateAsync(data);

    const payloadClassMember = {
      user_id: profile?.id,
      class_id: responseClassMutations?.data?.id,
      role: profile?.role,
    };

    await createClassMemberMutations.mutateAsync(payloadClassMember);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Create New Class</h2>

      <InputText
        label="Class Name"
        placeholder="e.g., Matematika"
        register={register("name")}
        error={errors.name}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          onClick={hideModal}
          styles="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          {" "}
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          styles="bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};
