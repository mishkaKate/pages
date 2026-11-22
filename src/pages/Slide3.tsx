import { Sticker } from "../components/sticker/Sticker";

import './Slide3.css'

export function Slide3() {
    return (
        <div
            className={`slide-card slide-card--top-right`}
        >
            <Sticker text="Салонная мощность" />
            <div className="slide-content">
                <h1 className='mobile-title'>
                    <img src='/icons/wheel.svg' alt="" className="mobile-title__icon" />
                    <p className="mobile-title__text">ИНОВАЦИОННЫЙ ЯПОНСКИЙ МОТОР</p>
                </h1>
                <h2 className="slide-content__title">Для ценителей комфорта и качества в уходе за волосами</h2>
                <img src="./images/page3-mob.png" className="slide-content-img-mobile"></img>
                <p className="slide-content__desc">Бесщеточный мотор BLDC</p>
            </div>
        </div>
    )
}
