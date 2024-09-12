import React, { useState } from "react";
import ConfirmationModal from "../components/ConfirmarcionModal";
import UserForm from "../components/UserForm";
import { initialData, userProp } from '../types/userProps';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<userProp>(initialData);
    const [mostrarPassword, setMostrarPassword] = useState<boolean>(false); // Estado para controlar la visibilidad de la password
    const [calendarioVisible, setCalendarioVisible] = useState<boolean>(false); // Estado para controlar el calendario
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false); // Estado para controlar el tooltip
    const [confirmationMessage, setConfirmationMessage] = useState<string>(''); // Mensaje del modal
    const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false); // Estado del modal de confirmación

    // Función para verificar si un carácter es un número
    const containsNumber = (text: string) => /\d/.test(text);

    // Función para verificar si un carácter es un signo especial
    const containsSpecialChar = (text: string) => /[!@#$%^&*(),.?":{}|<>]/.test(text);
 
    const handleSubmit = () => {
        // Validación de la contraseña
        if (!containsNumber(formData.password) || !containsSpecialChar(formData.password)) {
            setConfirmationMessage('La contraseña debe incluir al menos 1 número y 1 signo especial.');
            setConfirmationVisible(true);
            return;
        }
        // Validación del correo
        if (!formData.correo.includes('@')) {
            setConfirmationMessage('El correo electrónico debe contener un arroba (@).');
            setConfirmationVisible(true);
            return;
        }
        // Verificar si algún campo está vacío
        if (!formData.correo || !formData.password || !formData.nombre || !formData.fechaDeNacimiento) {
            setConfirmationMessage('Todos los campos son obligatorios.');
            setConfirmationVisible(true);
            return;
        }
        // Si todos los datos son correctos, mostrar el mensaje de datos enviados
        setConfirmationMessage(
            `Nombre: ${formData.nombre}\nCorreo: ${formData.correo}\nFecha de Nacimiento: ${formData.fechaDeNacimiento?.toLocaleDateString()}`
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

