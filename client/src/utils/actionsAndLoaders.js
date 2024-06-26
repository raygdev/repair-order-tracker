/* eslint-disable no-useless-catch */
import { redirect } from 'react-router-dom';
import { requireAuth } from "./requireAuth"
import {
    createNewUser,
    verifyUser,
    deleteRepairOrder,
    createRO,
    editRO,
    getUser,
} from './crud'
import { registerFormValidator } from "./validations/registerFormValidations"
import { loginFormValidator } from "./validations/loginFormValidations"
import { createFormValidator } from "./validations/createFormValidations"


export async function registerAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    let inputs = registerFormValidator.validate(user)
    if(!inputs.isValid){
      return inputs
    }

   try {
    const createdSuccessfully = createNewUser(user)
    if(createdSuccessfully) return redirect("/login");
    return null
   }
   catch(e) {
    throw e
   }
  }

  export async function loginAction({ request }) {
    const from = new URL(request.url).searchParams.get("from")
    const formData = await request.formData();
    const userObj = Object.fromEntries(formData);
    let inputs = loginFormValidator.validate(userObj)
    if(!inputs.isValid){
      return inputs
    }

    try {
     const user = await verifyUser(userObj);
     const redirectTo = from || `/user/${user._id}`
     return redirect(redirectTo);
    }
    catch(e) {
      console.log(e)
      return e.message
    }
  }

  export async function deleteRepairOrderAction({params}){
    const id = await params.repairId
    const userId = await params.userId
    try {
      const deleted = await deleteRepairOrder(id)
      if(deleted) return redirect(`/user/${userId}`)
      return redirect('/login?message=You must log in first!')
    }
    catch(e) {
      throw e
    }

}


export async function createROAction({ request, params }) {
    const formData = await request.formData();
    const roData = Object.fromEntries(formData);
    let ro = {
      ...roData,
      isWarranty: Boolean(roData.isWarranty),
    };
    let inputs = createFormValidator.validate(ro)

    if(!inputs.isValid){
      return inputs
    }
    try {
      const wasVehicleCreated = await createRO(ro)
      if(wasVehicleCreated) return redirect(`/user/${ro.userId}`);
    }
    catch(e) {
      throw e
    }
  }

export async function editRepairOrderAction({request, params}){
    const from = new URL(request.url).pathname
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const updatedRO = {
        ...ro,
        id: params.repairId,
        isWarranty: Boolean(ro.isWarranty),
        created_on: new Date(ro.created_on.replace(/-/g,'/'))
    }
    let inputs = createFormValidator.validate(updatedRO)
    if(!inputs.isValid){
      return inputs
    }

    try {
      let edited = await editRO(updatedRO)
      if(edited) return  redirect(
        `/user/${params.userId}/repairorder/${params.repairId}`
      )
      return redirect(`/login?message=You must log in first!&from=${from}`)
    }
    catch(e) {
      throw e
    }

}

export async function userLoader({params}){
  try {
    const user = await getUser(params.userId)
    if(!user) return redirect('/login')
    return user
  }
  catch(e) {
    throw e
  }
}

export function logoutAction(){
  localStorage.removeItem('token')
  return redirect('/login')
}

export async function repairOrderLoader({request}){
  await requireAuth(request)
  return null
}

