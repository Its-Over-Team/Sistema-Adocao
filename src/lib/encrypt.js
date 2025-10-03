import encrypt from 'encryptjs'

export function criptografar(senha) {
  const secretKey = process.env.ENCRYPT_SECRET
  const senhaCriptografada = encrypt.encrypt(senha, secretKey, 256)

  return senhaCriptografada
}

export function descriptografar(senhaCriptografada) {
  const secretKey = process.env.ENCRYPT_SECRET
  const senhaDescriptografada = encrypt.decrypt(senhaCriptografada, secretKey,256)

  return senhaDescriptografada
}
