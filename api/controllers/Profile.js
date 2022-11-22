const Profile = require("../models/Profile");
const expressAsyncHandler = require("express-async-handler");
const { sanitizeQueryInput } = require("../../utils/QuerySanitizer");

module.exports = {
  /**
   * @dev Get Specific Marketplaces
   */
  setProfile: expressAsyncHandler(async (req, res) => {
    let profile = await Profile.findOne({walletID:req.body.userPublicAddress})
    if(profile.username===""){
        let username = "";
        fetch("https://randomuser.me/api/").then(res=>res.json()).then(res=>{
            console.log(res)
            username = res.result[0].name.first;
        })
        profile = await profile.update({username:username},{new:false})  
    }
    if(!profile){
        let username = "";
        fetch("https://randomuser.me/api/").then(res=>res.json()).then(res=>{
            console.log(res)
            username = res.result[0].name.first;
        })
        profile = await Profile.create({walletID:req.body.userPublicAddress,username:username})
    }
    console.log(profile)
    res.status(200).send({profile: profile});
  })

}
