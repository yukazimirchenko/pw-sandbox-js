import { test, expect } from '@playwright/test';
import { newUserPayload, paramsPayload } from '../src/fixtures/apiPayloads';
import { generateString } from '../src/helpers/generators';

test.describe('API Go Rest ', async () => {

    const token = '5d9aef4d4d0ffa0516c0b18110bc1410658c79da4a63fc05301951111aa80b7e';
    let user_id = 0;
    let email = generateString(10) + `@email.com`;
    let newUserData = newUserPayload('John Smith', email, "male"); 

    const headersVariables = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    test('should retrieve all Users list', async ({ request }) => {

        let getAllUsers = await request.get('https://gorest.co.in/public/v2/users4', {
            headers: headersVariables,
            params: paramsPayload()
        })
        expect(getAllUsers.status()).toEqual(200);
    });

    test('should successfully create a new user', async ({ request }) => {

        let newUser = await request.post('https://gorest.co.in/public/v2/users',
            {
                headers: headersVariables,
                data: newUserData
            })
        expect(newUser.status()).toEqual(201);
        expect((await newUser.json()).name).toEqual(newUserData.name);
        expect((await newUser.json()).email).toEqual(newUserData.email);
        expect((await newUser.json()).gender).toEqual(newUserData.gender);
        user_id = (await newUser.json()).id; 
    });

    test('should get created user by id', async ({ request }) => {

        let userById = await request.get(`https://gorest.co.in/public/v2/users/${user_id}`,
            {
                headers: headersVariables
            })
        expect(userById.status()).toEqual(200);
        expect((await userById.json()).name).toEqual(newUserData.name);
        expect((await userById.json()).email).toEqual(newUserData.email);
        expect((await userById.json()).gender).toEqual(newUserData.gender);
    });

    test('should successfully update user', async ({ request }) => {

        let newName = generateString(15);

        let updatedUser = await request.put(`https://gorest.co.in/public/v2/users/${user_id}`,
            {
                headers: headersVariables,
                data: {
                    name: newName,
                    gender: "female"
                }
            })
        expect(updatedUser.status()).toEqual(200);
        expect((await updatedUser.json()).name).toEqual(newName);
        expect((await updatedUser.json()).gender).toEqual("female");
    })

    test('should successfully delete user', async ({ request }) => {

        let deleteUser = await request.delete(`https://gorest.co.in/public/v2/users/${user_id}`,
            {
                headers: headersVariables
            })
        expect(deleteUser.status()).toEqual(204);
        expect(deleteUser.statusText()).toContain('No Content');
    })

    test('deleted user should not be found and throw an error', async ({ request }) => {

        let deletedUser = await request.delete(`https://gorest.co.in/public/v2/users/${user_id}`,
            {
                headers: headersVariables
            })
        expect(deletedUser.status()).toEqual(404);
        expect((await deletedUser.json()).message).toContain("Resource not found");
    })
})