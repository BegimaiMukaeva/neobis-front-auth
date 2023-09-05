import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lorbyImg from '../img/illustration.png'

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            <h1 className='home-page__title'>Добро пожаловать!</h1>
            <h2 className='home-page__paragraph'>Lorby - твой личный репетитор</h2>
            <img className='home-page__img' src={lorbyImg} alt="Lorby Image" />
            <button className='home-page__button' onClick={() => setIsModalOpen(true)}>Выйти</button>

            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3 className='modal__title'>Выйти?</h3>
                        <p className='modal__paragraph'>Точно выйти?</p>
                        <button className='modal__button modal__button_out' onClick={() => navigate("/")}>Да, точно</button>
                        <button className='modal__button modal__button_open' onClick={() => setIsModalOpen(false)}>Нет, остаться</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
