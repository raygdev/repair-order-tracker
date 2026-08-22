import { useRouteLoaderData, useParams } from "react-router"
import type { RepairOrder } from "../../lib/domain"
import { RepairCard } from "../repair-card/repair-card"
import { Job } from "../job/job"

export const RepairOrderPage = () => {
  const params = useParams()
  const repairs = useRouteLoaderData('root') as RepairOrder[]

  const repair = repairs.find(r => r.id === params.repairId)

  if(!repair) {
    return <h2>Not Found</h2>
  }

  return (
    <>
      <RepairCard placement="repair"  repair={repair}/>
      {
        repair.jobs && repair.jobs.length > 0 && (
            repair.jobs.map(job => {
                return (
                    <div className="pt-6">
                      <Job job={job}/>
                    </div>
                )
            })
        )
      }
      {
        <h3>+ Add Job (this is not a button)</h3>
      }
    </>
  )
}