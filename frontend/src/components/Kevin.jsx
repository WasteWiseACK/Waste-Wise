import kevinWithFrog from '../assets/kevinWithFrog.jpg';

function Kevin() {
    return (
        <div className='its_us'>
            <div className='img_container_about'>
                <img src={kevinWithFrog} alt="Kevin with a frog" height={300} />
            </div>

            <div className='description_about'>
                <h1>Kevin Deleon</h1>
                <caption className='body' id='pronouns'>He/Him/His</caption>
                <p>For WasteWise, he played a large role in leading the styling and design of the application.</p>
                <p> Kevin also played
                    a key role in connecting frontend components to the backend, facilitating smooth data flow and integration between the client and server.</p>
                <a href="https://www.linkedin.com/in/kevin-deleon-55047a26a/">His LinkedIn</a>
                <h1 className='header2' id='role'>Frontend Developer</h1>
            </div>

        </div>
    )
}

export default Kevin;