import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Lorby from "../components/Lorby";
import Modal from '../components/Modal';
import BackImg from "../img/Frame 851211998.svg";

export const EmailContext = React.createContext();

const ConfirmationPage = () => {
    const [email] = useContext(EmailContext);
    const [showModal, setShowModal] = useState(false);

    const handleResendEmail = async () => {
        setShowModal(true);
    };

    return (
        <div className='container'>
            <div className='lorby-page'>
                <div>
                    <Lorby />
                </div>
                <div className='confirmation-page'>
                    <div className='back'>
                        <img src={BackImg} alt=""/>
                        <Link className='button-back' to="/new-password">Назад</Link>
                    </div>
                    <h2 className='confirmation-page__title'>Выслали письмо со ссылкой для завершения регистрации на {email}</h2>
                    <p className='confirmation-page__paragraph'>Если письмо не пришло, не <br/> спеши ждать совиную почту - <br/> лучше <span className='confirmation-page__spam'>проверь ящик “Спам”</span> <p className='confirmation-page__spam'> (´｡• ω •｡`)</p></p>
                    <button className={'have-not-user confirmation-page__button'} onClick={handleResendEmail}>Письмо не пришло</button>
                </div>
            </div>
            {showModal && <Modal email={email} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default ConfirmationPage;
