module.exports = {
    components:{
        securitySchemes:{
            ApiKeyAuth:{
                type:'apiKey',
                name:'Authorization',
                in:'header'
            }
        },
        schemas:{
            user:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:'user identification number',
                        example:'629f6ae18e2bccda1c6e8240'
                    },
                    name:{
                        type:'string',
                        description:'user name',
                        example:'pedro2.0'
                    },
                    email:{
                        type:'string',
                        description:'user email',
                        example:'pedro@gmail.com'
                    },
                    password:{
                        type:'string',
                        description:'user password',
                        example:'pedro123456'
                    },
                    confirmed:{
                        type:'boolean',
                        description:'user confirmation',
                        example:'false'
                    },
                    age:{
                        type:'number',
                        description:'user age',
                        example:'15'
                    },
                    role:{
                        type:'string',
                        description:'user role',
                        example:'user'
                    },
                    image:{
                        type:'string',
                        description:'user image',
                        example:'1654614753226--BreachingTorch.png'
                    },
                }
            },
            UserInput:{
                type:'object',
                properties:{
                    name:{
                        type:'string',
                        description:'Users name',
                        example:'Pepito'
                    },
                    email:{
                        type:'string',
                        description:'Users email',
                        example:'Pepito@gmail.com'
                    },
                    age:{
                        type:'number',
                        description:'User age',
                        example:3
                    },
                    password:{
                        type:'string',
                        description:'Users password',
                        example:'pepito123'
                    },
                    role:{
                        type:'string',
                        description:'Users role',
                        example:'user'
                    },
                    image:{
                        type:'string',
                        description:'user image',
                        example:'1654614753226--BreachingTorch.png'
                    },
                }
            },
            _id:{
                type:'objectId',
                description:'An id of user',
                example:'629f6ae18e2bccda1c6e8240'
            }
        }
    }
}