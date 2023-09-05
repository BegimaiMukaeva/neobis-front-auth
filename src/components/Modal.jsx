import React from 'react';

const Modal = ({ email, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3 className='modal__title'>Мы выслали еще одно письмо на указанную тобой почту {email}</h3>
                <p className='modal__paragraph'>Не забудь проверить ящик “Спам”!11!!!!</p>
                <button className='modal__button modal__button_out' onClick={onClose}>Понятно!!1!</button>
            </div>
        </div>
    );
}

export default Modal;
