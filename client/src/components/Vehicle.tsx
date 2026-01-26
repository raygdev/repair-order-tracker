interface VehicleProps {
  vehicle: Vehicle
}

export interface Vehicle {
  VIN: string,
  Year: string,
  Make: string,
  Model: string,
  EngineSize: string
}

export function Vehicle({ vehicle }: VehicleProps) {
  return (
    <>
      <h2 className="text-lg">Vehicle Info</h2>
      <div className="self-center text-slate-500">
        <p title="Vehicle Identification Number">VIN# {vehicle.VIN}</p>
        <p className="py-2">
          Year:{" "}
          <span className="border py-1 px-4 inline-block">{vehicle.Year}</span>
        </p>
        <p className="py-2">
          Make:{" "}
          <span className="border py-1 px-4 inline-block">{vehicle.Make}</span>
        </p>
        <p className="py-2">
          Model:{" "}
          <span className="border py-1 px-4 inline-block">{vehicle.Model}</span>
        </p>
        <p className="py-2">
          Engine Size:{" "}
          <span className="border py-1 px-4 inline-block">
            {vehicle.EngineSize}
          </span>
        </p>
      </div>
    </>
  );
}
