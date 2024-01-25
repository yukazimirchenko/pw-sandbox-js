export function paramsPayload() {
    return {
        page: 1, 
        per_page: 4
    }
}

export function newUserPayload(fullName, email, gender) {
    return {
        name: fullName, 
        email: email, 
        status: "active", 
        gender: gender
    }
}