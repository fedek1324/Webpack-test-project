async function start() {
    return await Promise.resolve('async works')
}

start().then(console.log) // console log promise result

class Util {
    static id = Date.now()
}

const unused = 42;

console.log('Util id: ', Util.id)

setTimeout(() => {
    import('lodash').then( _ => {
        console.log('lodash imported')
    })
}, 5000);