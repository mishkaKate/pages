import { Chip } from '../components/chip/Chip';
import './Slide1.css';

export function Slide1() {
    return (
        <>
            <div className='glow-bg'></div>
            <div className='glow-bg-sand'></div>
            <div className='glow-bg-white'></div>
            <div className='slide-wrapper'>
                <div className='title'><span>ФЕН и СТАЙЛЕР</span><span>в уникальном дизайне</span></div>
                <div className='images'>
                    <div className='image-wrapper image-wrapper-drayer'>
                        <Chip variant='dark' label='Фен' />
                        <img src='./images/drayer.png'></img>
                        {/* <div className="img img-drayer"></div> */}
                    </div>
                    <div className='center'>
                        <Chip variant='light' size='big' label='2 в 1'></Chip>
                    </div>
                    <div className='image-wrapper image-wrapper-styler'>
                        <Chip variant='light' label='Стайлер' />
                        <img src='./images/styler.png'></img>
                        {/* <div className="img img-styler"></div> */}
                    </div>

                </div>
            </div>
        </>

    )
}
