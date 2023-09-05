import React from "react";
import lorbyImg from '../img/illustration.png'

const Lorby = () => {
    return (
        <div className='lorby-img'>
            <div >
                <img src={lorbyImg} alt=""/>
            </div>
            <div>
                <h1 className='lorby-theme'>Lorby</h1>
            </div>
            <div>
                <h3 className='lorby-text'>Твой личный репетитор</h3>
            </div>
        </div>
    )
}

export default Lorby;