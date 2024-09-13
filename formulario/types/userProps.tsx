export type userProp = {
    nombre: string;
    rut: string;
    correo: string;
    password: string;
    fechaDeNacimiento: Date | null;
};

export const initialData: userProp = {
    nombre: '',
    rut: '',
    correo: '',
    password: '',
    fechaDeNacimiento: null,
};