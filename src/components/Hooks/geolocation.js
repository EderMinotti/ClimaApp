export function geolocation() {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation) {
            reject("Geocalização não suportada")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position)=> {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            },
            (error)=> {
                reject(error.message)
            }
        )
    })
}
