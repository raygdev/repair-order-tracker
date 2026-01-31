import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom"; 
import { toLocalDateString } from "@utils/datesHelpers";

import type { RepairOrder } from "../../lib/domain/models/repair-order.models";
import { StatusBadge } from "@components/status/status-badge";
import { AlertDialog } from "../alert-dialog/alert-dialog";

export interface OmitRepairFields extends Omit<
  RepairOrder,
  "_id" | "job" | "isWarranty" | "vehicle" | "vin" | "notes"
> {}

export interface Repair extends OmitRepairFields {
  vehicle?: Omit<RepairOrder["vehicle"], "VIN" | "EngineSize">;
}

interface CardProps {
  repair: Repair;
}

export function RepairCard({ repair }: CardProps) {
    const date = toLocalDateString(repair.created_on)
  return (
    <Card className="shadow-md border-gray-200">
      <CardHeader className="text-slate-600">
        <CardTitle className="flex justify-between items-center">
          <Link
            to={`repairorder/${repair.id}`}
            className="text-md text-blue-800 hover:text-blue-500"
          >
            RO {repair.ro_number}
          </Link>
          <div className="flex gap-4">
            <StatusBadge variant={repair.status || 'completed'} />
            <span className="text-sm">{date}</span>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {(!repair.vehicle) ? (
          <AlertDialog
            title="Please check your vin!"
            description="We can't seem to find a vehicle associated with that vin"
            level="warn"
          />
        ) : (
          <div>
            <dl className="flex justify-between">
              <div className="flex flex-col gap-4">
                <dt>Year</dt>
                <dd className="text-gray-500">{repair.vehicle.Year}</dd>
              </div>
              <div className="flex flex-col gap-4">
                <dt>Make</dt>
                <dd className="text-gray-500">{repair.vehicle.Make}</dd>
              </div>
              <div className="flex flex-col gap-4">
                <dt>Model</dt>
                <dd className="text-gray-500">{repair.vehicle.Model}</dd>
              </div>
            </dl>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
