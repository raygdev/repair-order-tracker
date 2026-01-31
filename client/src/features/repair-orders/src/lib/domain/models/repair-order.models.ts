import type { Vehicle } from "@features/shared/src/lib/domain/models/vehicle"
import type { Job, Status } from "./job.model"


// extend on this type when Jobs become available.
export interface RepairOrder {
  id: string,
  _id: string
  isWarranty: boolean,
  created_on: string,
  vin: string,
  ro_number: string,
  notes: string,
  vehicle: Vehicle,
  job?: Job,
  status: keyof typeof Status
}