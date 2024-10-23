import squidgame from '../assets/squidgame.jpg'

function Cindy() {
    return (
        <div className='its_us'>
            <div className='img_container_about'>
                <img src={squidgame} alt="Cindy with squidgame militia" height={300} />
            </div>
            <div className='description_about'>
                <h1>Cindy Nguyen</h1>
                <caption className='body' id='pronouns'>She/Hers/Her</caption>
                <p>For WasteWise, she served as the scrum master through faciliating sprint planning and daily stand-ups.</p>
                <p>In addition to this, Cindy also actively contributed to both the frontend and backend, assisting with key development tasks.</p>
                <a href="https://www.linkedin.com/in/sindnguyen/">Her LinkedIn</a>
                <h1 className='header2' id='role'>Scrum Master and Developer</h1>
            </div>

        </div>
    )
}

export default Cindy;