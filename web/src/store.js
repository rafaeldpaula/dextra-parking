const callbacks = {};
const lasts = {};

const store = {
    next(event, callback) {
        let id = Symbol();
        callbacks[event] = callbacks[event] || [];
        callbacks[event].push({id, callback});
        return id;
    },
    on(event, callback) {
        let id = store.next(event, callback);
        if (lasts[event]) {
            callback(lasts[event].data);
        }
        return id;
    },
    once(event, callback) {
        return new Promise(resolve => {
            let id = store.next(event, data => {
                store.clear(id);
                callback && callback(data);
                resolve(data);
            });
        });
    },
    emit(event, data) {
        callbacks[event] = callbacks[event] || [];
        callbacks[event].forEach(i => i.callback(data));
        lasts[event] = { data };
    },
    get(event) {
        return callbacks[event].last;
    },
    clear(...ids) {
        ids.forEach(id => Object.keys(callbacks).forEach(key => callbacks[key] = callbacks[key].filter(e => e.id !== id)));
    },
};

export default store;
