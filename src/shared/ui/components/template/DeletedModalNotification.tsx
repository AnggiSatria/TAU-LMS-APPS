import React from "react";
import Button from "../atoms/Button";

interface ModalPropsNotification {
  title?: string;
  subtext?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function DeletedModalNotification({
  title,
  subtext,
  onCancel,
  onConfirm,
}: ModalPropsNotification) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
      <p className="font-semibold mb-1">
        {title || "Are you sure you want to delete this?"}
      </p>
      <p className="text-sm mb-4">
        {subtext ||
          "This action cannot be undone. The class and all related data will be permanently removed."}
      </p>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onCancel}
          styles="border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          styles="rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Yes, Delete
        </Button>
      </div>
    </div>
  );
}
