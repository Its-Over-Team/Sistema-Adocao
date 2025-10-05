import { Pix } from 'pix-qrcode'
import QRCode from 'qrcode'

export function gerarPix(valor) {

  const payload = new Pix({
    version: 2,
    key: "chavepix-ficticia@exemplo.com",
    name: "nome",
    city: "cidade",
    value: valor,
  }).payload()

  return payload
}

export async function gerarQr(linkPix) {
    const qrCode = await QRCode.toDataURL(linkPix)
    
    return qrCode
}
