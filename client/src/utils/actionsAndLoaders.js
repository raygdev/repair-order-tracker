
import { redirect } from 'react-router-dom';
import {
    createNewUser,
    verifyUser,
    deleteRepairOrder,
    createRO,
    editRO,
    getUser,
    getVehicle
} from './crud'
import { registerFormValidator } from "./validations/registerFormValidations"


export async function registerAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    let inputs = registerFormValidator.validate(user)
    if(!inputs.isValid){
      return inputs
    }
    return createNewUser(user).catch((e) => console.log(e.message));
  }

  export async function loginAction({ request }) {
    const formData = await request.formData();
    const userObj = Object.fromEntries(formData);
    return await verifyUser(userObj).catch((e) => e.message);
  }

  export async function deleteRepairOrderAction({params}){
    const id = await params.repairId
    const userId = await params.userId
    return await deleteRepairOrder(id, userId)
}


export async function createROAction({ request, params }) {
    const formData = await request.formData();
    const roData = Object.fromEntries(formData);
    let ro = {
      ...roData,
      isWarranty: Boolean(roData.isWarranty),
    };
  
    return await createRO(ro, params.userId);
  }

export async function editRepairOrderAction({request,params}){
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const updatedRO = {
        ...ro,
        isWarranty: Boolean(ro.isWarranty),
        created_on: ro.created_on.replace(/-/g,'/')
    }

        return await editRO(updatedRO)
}

export async function userLoader({params}){
    return await getUser(params.userId)
}

export function logoutAction(){
  localStorage.removeItem('token')
  return redirect('/login')
}

export async function repairOrderLoader({request}){
  let url = new URL(request.url).searchParams
  let vin = url.get("vin")
  return await getVehicle(vin)
}

