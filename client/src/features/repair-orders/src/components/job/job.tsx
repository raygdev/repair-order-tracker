import { useState } from "react";
import { Ellipsis, Trash, SquarePen, Plus } from "lucide-react";
import { FormModal } from "@features/shared/src/components/form-modal/form-modal";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableHeader,
} from "@components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { StatusBadge } from "@components/status/status-badge";

import type { Job, Part } from "../../lib/domain/models/job.model";
import {
  createJobForm,
  createPartForm,
  editJobForm,
  editPartsForm
} from "../../lib/utils/transforms/form-transforms";
import { DeleteConfirmation } from "@features/shared/src/components/delete-confirmation/delete-confirmation";

export interface JobProps {
  job: Job;
}

/**
 * @todo add functionality to job button
 */

export function Job({ job }: JobProps) {
  const partsTotal =
    job.parts?.reduce((a, b) => a + b.price || 0, 0).toFixed(2) || 0;
  const totalLabor = (job.labor * 150).toFixed(2);
  const totalJob = (+totalLabor + +partsTotal).toFixed(2);
  const rowBorderStyles = "border-gray-300 hover:bg-gray-50";
  return (
    <section aria-labelledby="job-description">
      <div className="mb-4 py-5 px-1 rounded border-gray-200 border-1 flex justify-between items-center">
        <h2 className="font-bold" id="job-description">
          {job.description}
        </h2>
        <div className="flex gap-4">
          <StatusBadge variant={job.status} />
          <JobActions job={job} />
        </div>
      </div>
      <div>
        <div className="py-2 pl-2 flex items-center gap-4">
          <span className="text-sm font-bold">Labor</span>
          <span>{job.labor} hours</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow className={rowBorderStyles}>
              <TableHead>Part</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job.parts?.map((part) => (
              <TableRow className={rowBorderStyles} key={part.id}>
                <TableCell>{part.name}</TableCell>
                <TableCell>${part.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <PartActions part={part} job={job} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className={rowBorderStyles}>
              <TableCell>Total Parts</TableCell>
              <TableCell colSpan={2}>${partsTotal}</TableCell>
            </TableRow>
            <TableRow className={rowBorderStyles}>
              <TableCell className="font-bold">Total Job</TableCell>
              <TableCell colSpan={2}>${totalJob}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

interface PartActionProps {
  part: Part;
  job: Job
}

/**
 * @todo add functionality for edit and delete for a job
 */

function PartActions({ part }: PartActionProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false)

  const form = editPartsForm(part);

  const baseItemStyles =
    "flex items-center gap-2 cursor-pointer hover:bg-gray-50";
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            aria-label={`More actions for ${part.name}`}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-slate-50">
          <DropdownMenuItem
            className={baseItemStyles}
            onClick={() => setOpenEditForm(true)}
          >
            <SquarePen size={16} /> Edit{" "}
            <span className="sr-only">{part.name}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className={`text-red-600 ${baseItemStyles}`}
          >
            <Trash size={16} /> Delete{" "}
            <span className="sr-only">{part.name}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        id={part.id}
        name={part.name}
        path="part/delete"
      />
      <FormModal setOpen={setOpenEditForm} open={openEditForm} form={form} />
    </>
  );
}

interface JobActionProps {
  job: Job
}

function JobActions({ job }: JobActionProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [openEditForm, setOpenEditForm ] = useState(false)

  const partFrom = createPartForm(job.id)
  const editForm = editJobForm(job)

  const baseItemStyles =
    "flex items-center gap-2 cursor-pointer hover:bg-gray-50";
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            aria-label={`More actions for ${job.description}`}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-slate-50 p-2 flex flex-col gap-1">
          <DropdownMenuItem
            className={baseItemStyles}
            onClick={() => setOpenCreateForm(true)}
          >
            <Plus size={16} /> Add Part{" "}
            <span className="sr-only">for {job.description}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={baseItemStyles}
            onClick={() => setOpenEditForm(true)}
          >
            <SquarePen size={16} /> Edit{" "}
            <span className="sr-only">{job.description}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className={`text-red-600 ${baseItemStyles}`}
          >
            <Trash size={16} /> Delete{" "}
            <span className="sr-only">{job.description}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        id={job.id}
        name={job.description}
        path="job/delete"
      />
      <FormModal setOpen={setOpenCreateForm} form={partFrom} open={openCreateForm} />
      <FormModal setOpen={setOpenEditForm} form={editForm} open={openEditForm} />
    </>
  );
}


export function AddJobButton() {
  const [openForm, setOpenForm] = useState(false);
  const form = createJobForm();

  return (
    <>
    <Button
      onClick={() => setOpenForm(true)}
      variant='ghost'
      className="pt-8 text-blue-800"
    >
      <Plus /> Add Job
    </Button>
    <FormModal form={form} open={openForm} setOpen={setOpenForm}/>
    </>
  )
}