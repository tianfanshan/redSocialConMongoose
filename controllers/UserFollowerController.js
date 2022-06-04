// const UserFollower = require('../models/UserFollwer')
// const User = require('../models/User')

// const UserFollowerController = {
//     // async create(req,res){
//     //     try {
//     //         const follower = await UserFollower.create(
//     //             req.body.userId
//     //         )
//     //         res.send(follower)
//     //     } catch (error) {
//     //         console.error(error)
//     //         res.send('Algo no va bien al crear lista de seguidor')
//     //     }
//     // },
//     async follow(req,res){
//         try {
//             // const user = await User.findById(req.user._id)
//             // if(user.followings.includes(req.user._id)){
//             //     res.send('Ya estas siguiendo al usuario')
//             // }
//             // const follower = await UserFollower.create(
//             //     req.body.userId
//             // )
//             // console.log(follower)
//             const follow = await User.findByIdAndUpdate(
//                 req.params._id,
//                 {$push:{followers:req.user._id}},
//                 {new:true}
//             )
//             console.log(follow)
//             const followings = await User.findByIdAndUpdate(
//                 req.user._id,
//                 {$push:{followings:follow._id}},
//                 {new:true}
//             )
//             console.log(followings)
//             res.send({follow,followings})
//         } catch (error) {
//             console.error(error)
//             res.send('Algo no va bien')
//         }
//     }
// }

// module.exports = UserFollowerController;