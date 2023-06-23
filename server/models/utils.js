
/**
 * 
 * @param {array} data results array of vehicle information to transform
 * @returns if the vin is incorrect return Incorrect Vin else return transformed data
 */
function transformVehicleData(data){
    let variables = ["Make","Model", "Model Year", "Displacement (L)"]
    if(data[0].Value.includes("!") || (parseInt(data[1].Value) !== 0)){
        return "Possible Incorrect VIN"
    }
    /**
     * @variable array of objects with the targeted information
     */
    let dataToTransfrom = variables.map(variable => data.find(info => info.Variable === variable))
    /**
     * @variable reducer that reduces to a single object structured
     * with the correct vehicle information
     */
    let transformed = dataToTransfrom.reduce((accu, val) => {
        let name = val.Variable
        if(name === "Model Year"){
            accu["Year"] = val.Value
        } else if(name === "Displacement (L)"){
            accu["EngineSize"] = `${val.Value}L`
        } else {
            accu[name] = val.Value
        }
        return accu
    },{})
    return transformed
}

module.exports = {
    transformVehicleData
}