/**
 * Función para formatear un RUT chileno con guion.
 * Formato: 11111111-1
 * @param rut - El RUT ingresado por el usuario.
 * @returns El RUT formateado.
 */
export const formatoRUT = (rut: string): string => {
    // Elimina caracter que no sean numero o letra k
    const cleanRut = rut.replace(/[^0-9kK]/g, '');

    // inserta automaticamente el guion como penultimo, antes del ultimo numero
    const formattedRut = `${cleanRut.slice(0, -1)}-${cleanRut.slice(-1)}`;

    // devuelve en mayuscualas por la k
    return formattedRut.toUpperCase();
};

/**
 * Función que calcula el dígito verificador de un RUT chileno.
 * (para calcularlo hay que multiplicarlo y luego sumarlo, pero de derecha a izq)
 * @param rut - La parte numérica del RUT (sin el dígito verificador).
 * @returns El dígito verificador (número o 'K').
 */
export const calculadorDigitoVerificador = (rut: string): string => {
    let suma = 0;
    let multiplicador = 2;

    // recorre de derecha a izquerda
    for (let i = rut.length - 1; i >= 0; i--) {
        // multiplicamos por el multiplicador
        suma += parseInt(rut[i], 10) * multiplicador;
        // se incrementa el multiplicador hasta llegar a 7, donde se reinicia
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    // resto de la suma anterior por 11
    const resto = suma % 11;

    // finalmente se calcula el verificador restando el resto (valga la redundancia) por 11
    const verificador = 11 - resto;

    // retorna el verificador 0 si es 11 o k si es 10
    return verificador === 11 ? '0' : verificador === 10 ? 'K' : verificador.toString();
};

/**
 * Función para validar si el RUT ingresado tiene un dígito verificador correcto.
 * @param rut - El RUT completo, incluyendo el dígito verificador.
 * @returns `true` si el RUT es válido, `false` si es inválido.
 */
export const validarRUT = (rut: string): boolean => {
    // elimna puntos o guion, dejando solo numeros
    const cleanRut = rut.replace(/\./g, '').replace('-', '');
    
    // sepera el digito verificador (DV) del resto del rut
    const rutSinDv = cleanRut.slice(0, -1);
    const dvIngresado = cleanRut.slice(-1).toUpperCase();
    
    // llama la funcion que calcula el digito verificador 
    const dvCalculado = calculadorDigitoVerificador(rutSinDv);

    // compara el digito ingresado con el calculado y return true o false
    return dvIngresado === dvCalculado;
};
