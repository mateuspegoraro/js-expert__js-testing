const BaseRepository = require('./../repository/base/baseRepository')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
    }

    getRandomPositionFromAnArray(list) {
        const listLength = list.length
        return Math.floor(Math.random() * listLength)
    }

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromAnArray(carCategory.carIds)
        return carCategory.carIds[randomCarIndex]
    }

    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)
        return car
    }
}

module.exports = CarService