module.exports = {
    paths:{
        '/users':{
            get:{
                tags:{
                    Users:'Get users',
                },
                description:'Get users',
                operationId:'get Users',
                parameters:[],
                responses:{
                    200:{
                        description:'Usuario donde encontramos',
                        content:{
                            'application/json':{
                                schema:{
                                    $red:'#/components/schema/user',
                                }
                            }
                        }
                    }
                }
            },
            post:{
                tags:{
                    Users:'Create a user',
                },
                description:'Crea User',
                operationId:'createUser',
                parameters:[],
                requestBody:{
                    content:{
                        'application/jason':{
                            schema:{
                                $ref:'#/components/schemas/UserInput',
                            }
                        }
                    }
                },
                responses:{
                    201:{
                        description:'Usuario creado con éxito',
                    },
                    500:{
                        description:'Server error',
                    }
                }
            },
            put:{
                tags:{
                    Users:'Update a user',
                },
                description:'Update User',
                operationId:'updateUser',
                parameters:[
                    {
                        name:'_id',
                        in:'path',
                        schema:{
                            $ref:'#components/schema/_id'
                        },
                        description:'Id of User to be posted'
                    }
                ],
                requestBody:{
                    content:{
                        'application/json':{
                            schema:{$ref:'#/components/schemas/UserInput'}
                        }
                    }
                },
                responses:{
                    200:{description:'User updated successfully'},
                    404:{description:'User not found'},
                    500:{description:'Server error'},
                }
            }
        }
    }
}