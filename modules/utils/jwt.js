import * as jwt from 'jsonwebtoken';

const secret = process.env.SECRET

export function gerarToken(payload) {
  return jwt.sign(payload, secret);
}

export function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded
  } catch (error) {
    console.error('Não autorizado', error);
    return null;
  }
}