import cutiepie from '../assets/cutieAmerica.jpg';

function America() {
    return (
        <div className='its_us'>
            <div className='img_container_about'>
                <img src={cutiepie} alt="America in Mexico!" height={300} />

            </div>

            <div className='description_about'>
                <h1 className=''>America Xicotencatl</h1>
                <caption className='body' id='pronouns'>She/Her/Hers</caption >
                <p>For WasteWise, she was responsible for the backend architecture and database design.</p>
                <p>America played a significant role managing server-side logic and API integrations so the backend was not only robust, but aligned with the project's requirements.</p>
                <a href="https://www.linkedin.com/in/america-xicotencatl-01857731b/">Her LinkedIn</a>
                <h1 className='header2' id='role'>Backend Developer</h1>
            </div>

        </div>
    )
}

export default America;