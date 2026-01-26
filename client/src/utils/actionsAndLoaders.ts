/* eslint-disable no-useless-catch */
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { requireAuth } from "@utils/requireAuth"
import {
  getUserRepairOrders,
  editRepair,
  deleteRepair,
  createRepair
} from '@services/api/repair-orders';
import {
    createNewUser,
} from '@utils/crud'
import {
  registerFormValidator,
  loginFormValidator,
  createFormValidator 
} from "@utils/validations"
import { authService, type Creds } from '@services/auth';


export async function registerAction({ request } : ActionFunctionArgs) {
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

  export async function loginAction({ request }: ActionFunctionArgs) {
    const from = new URL(request.url).searchParams.get("from")
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData) as never as Creds
    let inputs = loginFormValidator.validate(credentials)
    if(!inputs.isValid){
      return inputs
    }

    try {
     await authService.login(credentials);
     const redirectTo = from || `/dashboard`
     return redirect(redirectTo);
    }
    catch(e: any) {
      return e.message
    }
  }

  export async function deleteRepairOrderAction({ params }: ActionFunctionArgs){
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


export async function createROAction({ request, params }: ActionFunctionArgs) {
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

interface RepairFormData {
  created_on: string,
  isWarranty: string,
  id: string
}

export async function editRepairOrderAction({ request }: ActionFunctionArgs){
    const from = new URL(request.url).pathname
    const formData = await request.formData()
    const ro = Object.fromEntries(formData) as never as  RepairFormData
    const repair = {
        ...ro,
        isWarranty: Boolean(ro.isWarranty),
        created_on: new Date(ro.created_on?.replace(/-/g,'/'))
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

export async function userLoader({ request }: ActionFunctionArgs){
  try {
    await requireAuth(request)
    const repairs = await getUserRepairOrders()
    return repairs
  }
  catch(e) {
    throw e
  }
}

export function logoutAction(){
  authService.logout()
  return redirect('/login')
}

export async function repairOrderLoader({request} : ActionFunctionArgs){
  await requireAuth(request)
  return null
}

