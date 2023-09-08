export const validationSchema = {
  titulo(value) {
    if (value?.length >= 6) return true;
    return 'O nome de da propiedade é obrigatório ou muito curto!';
  },
  precio(value) {
    /*
        ^ - Representa el inicio de la cadena.
        [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
        $ - Representa el final de la cadena.
    */
    if (/^[0-9]+$/.test(value)) return true;
    return 'O Preço deve ser só números!';
  },
  habitaciones(value) {
    if (value) return true;
    return 'Selecione uma Quantidade!';
  },
  wc(value) {
    if (value) return true;
    return 'Selecione uma Quantidade!';
  },
  estacionamiento(value) {
    if (value) return true;
    return 'Selecione uma Quantidade!';
  },
  descripcion(value) {
    if (value) return true;
    return 'Adicione uma Descricão';
  }
};

export const imageSchema = {
  imagen(value) {
    if (value) return true;
    return 'A Imagem é Obrigatória!';
  }
};
