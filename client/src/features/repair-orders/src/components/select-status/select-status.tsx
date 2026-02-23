import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@components/status/status-badge";
import { Status } from "../../lib/domain/models/job.model";
import { repairOrderActions } from "../../lib/domain/services/repair-order/repair-order.actions";

interface SelectStatusProps {
  status: keyof typeof Status;
  id: string;
}

export function StatusBadgeSelect({ status, id }: SelectStatusProps) {
  const statuses = Object.keys(Status) as (keyof typeof Status)[];
  return (
    <Select
      defaultValue={status}
      onValueChange={(value) =>
        repairOrderActions.put({
          id,
          status: value as keyof typeof Status,
        })
      }
    >
      <SelectTrigger className="outline-none border-none shadow-none p-0">
        <div className="pr-4">
          <SelectValue placeholder={<StatusBadge variant={status} />} />
        </div>
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="bg-white border rounded border-slate-100 shadow-sm p-3"
      >
        {statuses.map((_status) => (
          <SelectItem key={_status} value={_status}>
            <StatusBadge variant={_status} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
