import { redirect } from 'react-router-dom';
import {
    createNewUser,
    verifyUser,
    deleteRepairOrder,
    createRO,
    editRO,
    getUser
} from './crud'


export async function registerAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    const newUser = {
      name: {
        first: user.firstName,
        last: user.lastName,
      },
      email: user.email,
      password: user.password,
      shop_name: user.shop_name,
    };
  
    return createNewUser(newUser).catch((e) => console.log(e.message));
  }

  export async function loginAction({ request }) {
    const formData = await request.formData();
    const userObj = Object.fromEntries(formData);
    return verifyUser(userObj).catch((e) => e.message);
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
      isWarranty: roData.isWarranty ? true : false,
      userId: params.userId,
    };
  
    return await createRO(ro, params.userId);
  }

  export async function editRepairOrderAction({request,params}){
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const id = await params.repairId
    const userId = await params.userId
    const updatedRO = {
        ...ro,
        isWarranty: ro.isWarranty ? true: false,
        _id: id,
        created_on: ro.created_on.replace(/-/g,'/')
    }

        return await editRO(updatedRO, userId)
}

export function userLoader({params}){
    return getUser(params.userId).catch(e => console.log(e.message))
}

export function logoutAction(){
  localStorage.removeItem('token')
  return redirect('/login')
}



