export function InvalidVin({ vin }) {
  return (
    <>
      <p title="vehicle vin number">VIN# {vin}</p>
      <p className="text-red-500">
        The vehicle doesn't seem to exist! Please try editing the repair order
        and check that the vin is correct!
      </p>
    </>
  );
}
