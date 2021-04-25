exports.encryptToken = (token) => {
    const key = Math.floor(Math.random() * 4) + 1
    let encryptedToken = Array.from(token).map((item, index) => token.charCodeAt(index)
    )
    encryptedToken = encryptedToken.map(item => item + 3 )
    encryptedToken = encryptedToken.map(item => String.fromCharCode(item) )
    // encryptedToken.push(key)
    encryptedToken = encryptedToken.join("")
    return encryptedToken
}
exports.decryptToken = (token) => {
    let encryptedToken = Array.from(token)
    // let key = encryptedToken.pop()
    // key = key[0]
    encryptedToken = encryptedToken.map((item, index) => token.charCodeAt(index)
    )
    encryptedToken = encryptedToken.map(item => item - 3 )
    encryptedToken = encryptedToken.map(item => String.fromCharCode(item) )
    const decryptedToken = encryptedToken.join("")
    return decryptedToken
}
