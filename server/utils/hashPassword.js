import bcrpyt from "bcryptjs"
const salt=bcrpyt.genSaltSync(10);
export const hashPassword=password=>{return bcrpyt.hashSync(password,salt)};
export const comparePasswords=(inputPass,hashedPass)=>
{
    return bcrpyt.compareSync(inputPass,hashedPass)
}
