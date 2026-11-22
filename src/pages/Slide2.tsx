import { Chip } from '../components/chip/Chip';
import { Sticker } from '../components/sticker/Sticker';
import './Slide2.css';

export function Slide2() {
    return (
        <>
            <div className='glow-bg-sand-big'></div>
            <div
                className="slide-card"
            >
                <Sticker text={'Не тяжелее чашки кофе'} />
                <div className="slide-content">
                    <h1 className='mobile-title'>
                        <img src='/icons/feather.svg' alt="" className="mobile-title__icon" />
                        <p className="mobile-title__text">ЛЕГКОСТЬ И КОМФОРТ В РУКЕ</p>
                    </h1>
                    <h2 className="slide-content__title">СУПЕР ЛЕГКИЙ</h2>
                    <p className="slide-content__desc">Уменьшает усталость рук при сушке волос, делая процедуру удобной и приятной даже после
                        напряжённого рабочего дня.</p>
                    <Chip label={'500 г'} variant="light" />
                </div>
            </div>
        </>

    );
}
