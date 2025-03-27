
import { User } from "@/data/mockUsers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteUserDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedUser: User | null;
  confirmDeleteUser: () => void;
}

const DeleteUserDialog = ({
  isOpen,
  setIsOpen,
  selectedUser,
  confirmDeleteUser,
}: DeleteUserDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="border border-gray-200 shadow-[0px_1px_24px_0px_rgba(0,0,0,0.05),0px_1px_4px_0px_rgba(0,0,0,0.15)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-[#21205F]">
            <Trash2 className="h-5 w-5 mr-2 text-red-500" />
            Delete User
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the user <span className="font-medium">{selectedUser?.name}</span>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-[4px] border-gray-300">
            Cancel
          </AlertDialogCancel>
          <Button 
            onClick={confirmDeleteUser} 
            className="bg-red-600 hover:bg-red-700 text-white rounded-[4px]"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
