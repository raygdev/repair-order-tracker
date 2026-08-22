import { type FC, type Dispatch, type SetStateAction, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@components/ui/dialog";
import { Trash } from "lucide-react";
import type { Part } from "@features/repair-orders/src/lib/domain";
import { Spinner } from "@components/ui/spinner";

type DeleteConfirmationPropTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  id: Part["id"];
};

export const DeleteConfirmation: FC<DeleteConfirmationPropTypes> = ({
  open,
  setOpen,
  name,
  id,
}) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      setOpen(false);
    }
  }, [fetcher]);

  const isDeleting = fetcher.state !== "idle";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete {name}?</DialogTitle>
            <DialogDescription>
              Performing this action will permenantly delete this item.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose disabled={isDeleting} asChild>
              <Button
                disabled={isDeleting}
                variant={"outline"}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isDeleting}
              variant={"outline"}
              className="text-red-600 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
              onClick={() =>
                fetcher.submit(
                  { id },
                  {
                    method: "delete",
                    action: `part/delete/${id}`,
                    encType: "application/json",
                  },
                )
              }
            >
              {!isDeleting ? (
                <Trash size={16} />
              ) : (
                <Spinner className="size-2" />
              )}
              {isDeleting ? "Submitting" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
