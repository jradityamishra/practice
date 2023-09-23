import adhardetailShema from "../models/adhardetailShema.js"



//new  adhar register

export const adhar_detail_post_Controller = async (req, resp) => {
    try {
        const photo = req.file.filename
        const { name, fathersName, adharNo, mobileNo, email } = req.body;
        //check adhar no size
        if(!name){
            
            resp.status(401).send("Please enter your name")
        }
        if(!fathersName){
            
            resp.status(401).send("Please enter your fathers name")
        }
        if(!mobileNo){
            
            resp.status(401).send("Please enter your mobile name")
        }
        if(!email){
            
            resp.status(401).send("Please enter your email id")
        }
        if (adharNo.length !=12) {
            
            resp.status(401).send("adhar no not less tha 12")
        }
        //check existing adhar
        const existingadhar = await adhardetailShema.findOne({ adharNo })
        if (existingadhar) {
            return resp.status(409).json("Adhar No Already Exist")
        }
        //if new adhar than sava
        const data = await new adhardetailShema({
            name,
            fathersName,
            adharNo,
            mobileNo,
            email,
            photo
        }).save();
        resp.status(200).send({
            sucess: true,
            message: "user register sucessfully",
            data,
        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in uploading data"
        })
    }
}

//GET ADHAR DETAILs

export const get_detail_post_Controller = async (req, resp) => {
    try {
        const {adharNo} = req.body

        // if(!adharNo){
        //     resp.status(401).send("Please check Your Adhar Number")
        // }
        const detail=await adhardetailShema.findOne({adharNo:adharNo});
        console.log(detail);
        //change image from buffer to asii string
        //`data:${user.userPhotoExtensionType};base64, ${Buffer.from(user.userPhoto.data).toString('base64')}
        const photo=Buffer.from(detail.photo).toString('ascii');
        if(!detail){
            console.log("not find data")
        }
        
        resp.status(201).send({
            success: true,
            message: resp.message,
            data:{
                name:detail.name,
                adharNo:detail.adharNo,
                fathersName:detail.fathersName,
               email:detail.email,
               mobileNo:detail.mobileNo,
               photo:photo
            }
        })
    }
    catch (error) {
        console.log(error)
        resp.status(500)
            .send(
                {
                    success: false,
                    message: "error in getting data",
                }
            )
    }
}


///check mail is true or not

export const checkadminController=async(req,resp)=>{
    try{
        const {adharNo}=req.body;

        const data=await adhardetailShema.find({adharNo});
        
        if(data){
            resp.status(200).send({
                success:true,
                message:'we get data',
                data

            })
        }else{
            resp.status(401).send({
                success:false,
                message:'we not get data'
            })
        }
    }catch(error){
        console.log(error)
        resp.status(500).send({
            success:false,
            message:error.message
        })
    }
}
