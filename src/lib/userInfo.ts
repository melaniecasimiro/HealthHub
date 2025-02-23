import { userInfoPath } from "./apiPaths"
let jsonHeader = {
    'Content-Type': 'application/json'
}

export async function getUserInfo(){
    const result = await fetch(userInfoPath)
    return result
}

//NOTE: empty now, add either more funcitons or fit all parameters, with default values to this one later
export async function updateUserInfo(userData){
    const result = await fetch(`${userInfoPath}`, {
        method: 'PUT',
        headers: jsonHeader,
        body: JSON.stringify(userData)
    })

    return result;
}




