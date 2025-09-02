"use client";

import {
  IResponseClassMemberDetail,
  IResponseClassMemberList,
} from "@/shared/lib/interfaces/class-members.interface";

interface Props {
  members: IResponseClassMemberList;
}

export default function ClassMembersList({ members }: Props) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members?.map((member: IResponseClassMemberDetail) => (
          <div
            key={member?.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">
              {member?.user?.first_name} {member?.user?.last_name}
            </h2>
            <p className="text-gray-600">{member?.user?.email}</p>
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium">{member?.role}</span>
            </p>
            <p className="text-sm text-gray-500">
              Class: <span className="font-medium">{member?.class?.name}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
