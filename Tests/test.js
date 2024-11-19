const { default: axios } = require("axios")
const { default: test } = require("node:test")


const BASE_URL = 'https://localhost:3000'

describe('Authentication',()=>{
    test('User is able to signup only once',async ()=>{
        const username = `User-${Math.random}`
        const password = `123456`
        const response = await axios.post(`${BASE_URL}/api/v1/signup`,{
            username,
            password,
            type:'admin'
        })
        expect(response.status).toBe(200)

        const updatedResponse = await axios.post(`${BASE_URL}/api/v1/signup`,{
            username,
            password,
            type:'admin'
        })
        expect(updatedResponse.status).toBe(400)
    })

    test("Signup request fails if the username is empty",async ()=>{
        const username = `User-${Math.random}`
        const password = `123456`

        const response = await axios.post(`${BASE_URL}/api/v1/signup`,{
            password,
            type:'admin'
        })
        expect(response.status).toBe(400)
    })

    test("signin suceseeds if the username and password are correct",async ()=>{
        const username = `User-${Math.random}`
        const password = `123456`
        const response = await axios.post(`${BASE_URL}/api/v1/signin`,{
            username,
            password,
            type:'admin'
        })
        expect(response.status).toBe(200)
        expect(response.body.token),toBeDefined()
    })

    test("signin rejected if the username and password are in-correct",async ()=>{
        const username = `User-${Math.random}`
        const password = `123456`

        const response = await axios.post(`${BASE_URL}/api/v1/signup`,{
            username,
            password,
            type:'admin'
        })
        expect(response.status).toBe(200)

        const updatedResponse = await axios.post(`${BASE_URL}/api/v1/signin`,{
            username:'WrongUsername-1',
            password,
            type:'admin'
        })
        expect(updatedResponse.status).toBe(403)
    })

})