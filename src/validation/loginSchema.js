export const loginSchema = {
  email(value) {
    if (!value) {
      return 'Email é Obrigatório!';
    }
    // se é um email válido
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return 'Email inválido!';
    }
    return true;
  },
  password(value) {
    if (value) return true;
    return 'Password é Obrigatório!';
  }
};
