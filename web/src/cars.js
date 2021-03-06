import yawp from 'yawp';
import store from './store.js';

class Cars {
    static _handleError(ex) {
        console.log(ex);
        store.emit('login', null);
        store.emit('route', '/login');
    }

    static async list() {
        try {
          return (await yawp('/cars').list()).sort((c1, c2) => c1.name.localeCompare(c2.name));
        } catch (e) {
          Cars._handleError(e);
        }
    }

    static async updateLocation(car, location) {
        try {
            const latLong = `${location.lat},${location.lng}`;
            car.location = latLong;
            return await yawp(car.id).patch({ id: car.id, location: latLong });
          } catch (e) {
            Cars._handleError(e);
          }
    }

    static parseLocation(locationStr) {
        const split = locationStr.split(",");
        return {
            lat: split[0],
            lng: split[1],
        };
    }
}

export default Cars;
