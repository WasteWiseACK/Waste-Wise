import kevinWithFrog from '../assets/kevinWithFrog.jpg';

function Kevin() {
    return (
        <>
            <h1>Kevin Deleon</h1>
            <h2>Frontend Developer</h2>
            <img src={kevinWithFrog} alt="Kevin with a frog" height={500} />
            <p>He/Him/His</p>
            <p>For WasteWise, he played a large role in leading the styling and design of the application.</p>
            <p> Kevin also played
                a key role in connecting frontend components to the backend, facilitating smooth data flow and integration between the client and server.</p>
            <a href="https://www.linkedin.com/in/kevin-deleon-55047a26a/">His LinkedIn</a>
        </>
    )
}

export default Kevin;