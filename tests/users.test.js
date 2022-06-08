const request = require('supertest')
const app = require('../index')
const User = require('../models/User')

desctibe('testing/users',()=>{
    afterAll(()=>{
        return User.deleteMany({where:{},truncate:true});
    })
    const user = {
        name: 'Username',
        email: 'test@example.com',
        password: '123456',
        role: 'user',
        confirmed: false,
        age: 2,
        image: ''
    }
    test('Create a user',async()=>{
        const res = await requires(app)
        .post('/users')
        .send(user)
        .expect(201)
    
        expect(res.body.user.id).isBeDefined();
        expect(res.body.user.createdAt).toBeDefined();
        expect(res.body.user.updatedAt).toBeDefined();
        const sendUser = {
            ...user,
            id:res.body.user.id,
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt
        };
        const newUser = res.body.user;
        expect(newUser).toEqual(sendUser);
    })
})

