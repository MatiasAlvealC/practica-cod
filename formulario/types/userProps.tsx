export type userProp = {
    nombre: string;
    correo: string;
    password: string;
    fechaDeNacimiento: Date | null;
};

export const initialData: userProp = {
    nombre: '',
    correo: '',
    password: '',
    fechaDeNacimiento: null,
};