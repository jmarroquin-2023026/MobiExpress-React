import React, { useState } from "react";
import { useUser } from "../../shared/hooks/user/useUser";

export const DeleteProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");
    const [disable,setDisable]=useState(true)
    const {deleteProfile}=useUser()
    const handleDelete = (e) => {
        e.preventDefault()
        deleteProfile()
        setShowModal(false);
        setConfirmationText("");
    };

    const handleConfirmationText=()=>{
        if (confirmationText === "ACEPTAR") {
            setDisable(false)
        }else{
            setDisable(true)
        }
    }

    return (
        <div>
        <button onClick={() => setShowModal(true)}>Eliminar perfil</button>

        {showModal && (
            <div
            
            >
            <div >
                <h3>¿Estás seguro de querer eliminar tu perfil?</h3>
                <p>Escribe <strong>"ACEPTAR"</strong> para confirmar.</p>
                <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Escribe ACEPTAR"
                onBlur={handleConfirmationText}
                />
                <div >
                <button onClick={handleDelete} disabled={disable} >
                    Confirmar
                </button>
                <button onClick={() => {
                    setShowModal(true)
                    setConfirmationText("")
                }}>
                    Cancelar
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};
