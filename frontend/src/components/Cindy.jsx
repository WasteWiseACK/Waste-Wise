import squidgame from '../assets/squidgame.jpg'

function Cindy() {
    return (
        <>
            <h1>Cindy Nguyen</h1>
            <h2>Scrum Master and Developer</h2>
            <img src={squidgame} alt="Cindy with squidgame militia" height={500} />
            <p>She/Hers/Her</p>
            <p>For WasteWise, she served as the scrum master through faciliating sprint planning and daily stand-ups.</p>
            <p>In addition to this, Cindy also actively contributed to both the frontend and backend, assisting with key development tasks.</p>
            <a href="https://www.linkedin.com/in/sindnguyen/">Her LinkedIn</a>
        </>
    )
}

export default Cindy;