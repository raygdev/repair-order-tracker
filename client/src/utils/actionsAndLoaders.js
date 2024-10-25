/* eslint-disable no-useless-catch */
import { redirect } from 'react-router-dom';
import { requireAuth } from "./requireAuth"
import {
  getUserRepairOrders,
  editRepair,
  deleteRepair,
  createRepair
} from '../services/api/repair-orders';
import {
  login
} from '../services/auth'
import {
    createNewUser,
} from './crud'
import { registerFormValidator } from "./validations/registerFormValidations"
import { loginFormValidator } from "./validations/loginFormValidations"
import { createFormValidator } from "./validations/createFormValidations"
import { clearToken } from './token';


export async function registerAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    let inputs = registerFormValidator.validate(user)
    if(!inputs.isValid){
      return inputs
    }

   try {
    const createdSuccessfully = await createNewUser(user)
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
    const credentials = Object.fromEntries(formData);
    let inputs = loginFormValidator.validate(credentials)
    if(!inputs.isValid){
      return inputs
    }

    try {
     await login(credentials);
     const redirectTo = from || `/dashboard`
     console.log('[REDIRECTING] LOGIN')
     return redirect(redirectTo);
    }
    catch(e) {
      console.log('[CATCHING ERROR]: ',e)
      return null
      // return e.message
    }
  }

  export async function deleteRepairOrderAction({params}){
    const id = await params.repairId
    try {
      const deleted = await deleteRepair(id)
      if(deleted) return redirect('/dashboard')
      return redirect('/login?message=You must log in first!')
    }
    catch(e) {
      throw e
    }

}


export async function createROAction({ request, params }) {
    const formData = await request.formData();
    const updatedRepair = Object.fromEntries(formData);
    let repair = {
      ...updatedRepair,
      isWarranty: Boolean(updatedRepair.isWarranty),
    };
    let inputs = createFormValidator.validate(repair)

    if(!inputs.isValid){
      return inputs
    }
    try {
      const wasVehicleCreated = await createRepair(repair)
      if(wasVehicleCreated) return redirect(`/dashboard`);
    }
    catch(e) {
      throw e
    }
  }

export async function editRepairOrderAction({ request }){
    const from = new URL(request.url).pathname
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const repair = {
        ...ro,
        isWarranty: Boolean(ro.isWarranty),
        created_on: new Date(ro.created_on.replace(/-/g,'/'))
    }

    let inputs = createFormValidator.validate(repair)
    if(!inputs.isValid){
      return inputs
    }

    try {
      let edited = await editRepair(repair)
      if(edited) return  redirect(
        `/dashboard/repairorder/${repair.id}`
      )
      return redirect(`/login?message=You must log in first!&from=${from}`)
    }
    catch(e) {
      throw e
    }

}

export async function userLoader({ request }){
  try {
    console.log('[LOADING USER]')
    await requireAuth(request)
    const repairs = await getUserRepairOrders()
    return repairs
  }
  catch(e) {
    throw e
  }
}

export function logoutAction(){
  clearToken()
  return redirect('/login')
}

export async function repairOrderLoader({request}){
  await requireAuth(request)
  return null
}

