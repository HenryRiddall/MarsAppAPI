import axios from "axios";

const apiKey = "?api_key=nhC9EfMzxrLh3CBzv0dm2jmlJrlWmLyIEL9LO9JO"

interface Rover {
    id: number
    name: string
    landing_date: string
    launch_date: string
    status: string
    max_sol: number
    max_date: string
    total_photos: number
    cameras: Camera[]
}

interface Camera {
    id: number
    name: string
    rover_id: number
    full_name: string
}

interface Photo {
    id: number
    sol: number
    camera: Camera
    img_src: string
    earth_date: string
    rover: Rover
}

export async function getRovers() {
    return await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${apiKey}`)
}

export async function getLatestPicture(roverName: string, cameraName: string) {
    const response = await getRovers()
    const rovers: Rover[] = response.data.rovers
    const myRover: Rover = rovers.filter(rover => rover.name.toLowerCase() === roverName.toLowerCase())[0]
    return axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos${apiKey}&camera=${cameraName}&sol=${myRover.max_sol}`)
}