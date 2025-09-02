"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/shared/ui/context/ModalContext";
import { IResponseUserDetail } from "@/shared/lib/interfaces/users.interfaces";
import { AsyncSelectController } from "../organism/AsyncSelectController";
import { useCreateClassMember } from "@/shared/lib/services/classMembers/hooks";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Button from "../atoms/Button";
import { useReadUsers } from "@/shared/lib/services/users/hooks";

const formSchema = z.object({
  user_id: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { required_error: "Harap pilih anggota kelas" }
  ),
});

type FormData = z.infer<typeof formSchema>;

interface AddClassMemberFormProps {
  refetch: () => void;
  classId: string;
  role: "student" | "teacher";
}

export const AddClassMemberForm = ({
  refetch,
  classId,
  role,
}: AddClassMemberFormProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { hideModal } = useModal();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data: usersData } = useReadUsers({
    activeFilter: { search: debouncedSearch },
  });

  const users = usersData && usersData?.data;

  const loadOptions = async (inputValue: string) => {
    setSearch(inputValue);

    return (
      users?.map((item: IResponseUserDetail) => ({
        label: `${item?.first_name} ${item?.last_name}`,
        value: item?.id,
      })) || []
    );
  };

  const { mutations: createClassMemberMutations } = useCreateClassMember({
    refetch: refetch,
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      user_id: data?.user_id?.value,
      class_id: classId,
      role: role,
    };

    await createClassMemberMutations.mutateAsync(payload);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Add New Class Members</h2>

      <AsyncSelectController
        name="user_id"
        label="Select Users"
        placeholder="Choose one..."
        loadOptions={loadOptions}
        control={control}
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
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
};
