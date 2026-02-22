import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadgeSelect } from "../select-status/select-status"

import { toLocalDateString } from "@utils/datesHelpers";
import type { RepairOrder } from "../../lib/domain/models/repair-order.models";
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
  const date = toLocalDateString(repair.created_on);
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
            <StatusBadgeSelect id={repair.id} status={repair.status} />
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {!repair.vehicle ? (
          <AlertDialog
            title="Please check your vin!"
            description="We can't seem to find a vehicle associated with that vin"
            level="warn"
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div>
              <p className="flex gap-2 items-center">
                Created on{" "}
                <span className="text-sm text-slate-600">{date}</span>{" "}
              </p>
            </div>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
