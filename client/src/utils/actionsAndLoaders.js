
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


export async function registerAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
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

    const ids = {
        ro_id: id,
        userId
    }
    return await deleteRepairOrder(ids)

}


export async function createROAction({ request, params }) {
    const formData = await request.formData();
    const roData = Object.fromEntries(formData);
    let ro = {
      ...roData,
      userId: params.userId,
      isWarranty: Boolean(roData.isWarranty),
    };
  
    return await createRO(ro, params.userId);
  }

export async function editRepairOrderAction({request,params}){
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const userId = await params.userId
    const updatedRO = {
        ...ro,
        isWarranty: Boolean(ro.isWarranty),
        created_on: ro.created_on.replace(/-/g,'/')
    }

        return await editRO(updatedRO, userId)
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

