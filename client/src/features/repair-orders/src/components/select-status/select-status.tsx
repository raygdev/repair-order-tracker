import { useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@components/status/status-badge";
import { JobStatus } from "../../lib/domain/models/job.model";
import { RepairOrderStatus } from "../../lib/domain/models/repair-order.models";
import { JobStatusUpdateUseCase } from "../../lib/use-cases/jobs/job-status-update.use-case";
import { RepairOrderStatusUpdateUseCase } from "../../lib/use-cases/repair-orders/repair-order-status-update.use-case";
import { jobService } from "../../lib/adapters/job.service";
import { repairOrderService } from "../../lib/adapters/repiar-order.service";

type SelectStatusProps = {
  id: string;
  kind: "repair-order";
  status: keyof typeof RepairOrderStatus;
} | {
  id: string;
  kind: "job";
  status: keyof typeof JobStatus;
};

export function StatusBadgeSelect({ status, id, kind }: SelectStatusProps) {
  const repairOrderStatusUpdateUseCase = useMemo(() => new RepairOrderStatusUpdateUseCase(repairOrderService), [])
  const jobStatusUpdateUseCase = useMemo(() => new JobStatusUpdateUseCase(jobService), [])

  const updateStatus = (value: string) => {
    if (kind === "job") {
      return jobStatusUpdateUseCase.execute({
        id,
        status: value as keyof typeof JobStatus,
      });
    }

    return repairOrderStatusUpdateUseCase.execute({
      id,
      status: value as keyof typeof RepairOrderStatus,
    });
  };

  return (
    <Select
      defaultValue={status}
      onValueChange={updateStatus}
    >
      <SelectTrigger aria-label="Toggle status selection" className="outline-none border-none shadow-none p-0">
        <div className="pr-4">
          {kind === "job"
            ? <SelectValue placeholder={<StatusBadge kind="job" variant={status} />} />
            : <SelectValue placeholder={<StatusBadge kind="repair-order" variant={status} />} />}
        </div>
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="bg-white border rounded border-slate-100 shadow-sm p-3"
      >
        {kind === "job"
          ? (Object.keys(JobStatus) as (keyof typeof JobStatus)[]).map((_status) => (
              <SelectItem key={_status} value={_status}>
                <StatusBadge kind="job" variant={_status} />
              </SelectItem>
            ))
          : (Object.keys(RepairOrderStatus) as (keyof typeof RepairOrderStatus)[]).map((_status) => (
              <SelectItem key={_status} value={_status}>
                <StatusBadge kind="repair-order" variant={_status} />
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
}
