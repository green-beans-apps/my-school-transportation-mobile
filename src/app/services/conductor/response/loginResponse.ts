export type loginResponse = {
  token: string,
  conductor: {
    id: string,
    name: string,
    email: string,
    cpf: string,
  }
}