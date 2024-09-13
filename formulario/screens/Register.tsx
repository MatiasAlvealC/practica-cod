import React, { useState } from "react";
import ConfirmationModal from "../components/ConfirmarcionModal";
import UserForm from "../components/UserForm";
import { initialData, userProp } from '../types/userProps';
import { validarRUT } from '../utils/rutUtils';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<userProp>(initialData);
    const [mostrarPassword, setMostrarPassword] = useState<boolean>(false); // Estado para controlar la visibilidad de la password
    const [calendarioVisible, setCalendarioVisible] = useState<boolean>(false); // Estado para controlar el calendario
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false); // Estado para controlar el tooltip
    const [confirmationMessage, setConfirmationMessage] = useState<string>(''); // Mensaje del modal
    const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false); // Estado del modal de confirmación


    // Función para verificar si un carácter es un número
    const containsNumber = (text: string) => /\d/.test(text);

    // Función para verificar contraseña con largo adecuado y complejidad
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // minusccula,mayuscula,signos y numero. length=8

    // Funcion para verificar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // formato : blabla@blabla.bla

    // caracter validos para el nombre
    const nameRegex = /^[a-zA-Z\s'-]+$/;
 
    const handleSubmit = () => {
        // Verificar si algún campo está vacío
        if (!formData.correo || !formData.password || !formData.nombre || !formData.fechaDeNacimiento) {
            setConfirmationMessage('Todos los campos son obligatorios.');
            setConfirmationVisible(true);
            return;
            }


        // Validación del formato del nombre
        if (!nameRegex.test(formData.nombre)) {
            setConfirmationMessage('El nombre solo debe contener letras y caracteres válidos.');
            setConfirmationVisible(true);
            return;
        }

        // Validación del RUT
        if (!validarRUT(formData.rut)) {
            setConfirmationMessage('RUT inválido. Verifica el dígito verificador.');
            setConfirmationVisible(true);
            return;
        }


        // Validación de formato de correo
        if (!emailRegex.test(formData.correo)) {
            setConfirmationMessage('El correo electrónico no tiene un formato válido.');
            setConfirmationVisible(true);
            return;
        }
        

        if (!passwordStrengthRegex.test(formData.password)) {
            setConfirmationMessage('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
            setConfirmationVisible(true);
            return;
        }
        
        // Si todos los datos son correctos, mostrar el mensaje de datos enviados
        setConfirmationMessage(
            ` Nombre: ${formData.nombre}\nRut: ${formData.rut}\nCorreo: ${formData.correo}\nFecha de Nacimiento: ${formData.fechaDeNacimiento?.toLocaleDateString()}`
        );
        setConfirmationVisible(true);
    };

    const handleConfirm = (date: Date) => {
        setFormData({ ...formData, fechaDeNacimiento: date });
        setCalendarioVisible(false);
    };

    return (
        <>
            <UserForm
                formData={formData}
                setFormData={setFormData}
                mostrarPassword={mostrarPassword}
                setMostrarPassword={setMostrarPassword}
                calendarioVisible={calendarioVisible}
                setCalendarioVisible={setCalendarioVisible} 
                tooltipVisible={tooltipVisible}
                setTooltipVisible={setTooltipVisible}
                handleSubmit={handleSubmit}
                handleConfirm={handleConfirm}
            />

            {/* Modal de confirmación para mostrar mensajes */}
            <ConfirmationModal
                visible={confirmationVisible}
                message={confirmationMessage}
                onClose={() => setConfirmationVisible(false)}
            />
        </>
    );
};

export default Register;

