
const { EventEmitter } = require('events')
const myEmitter  = new EventEmitter();

// Case 1

const birthdayEventListener = (name) => {
    console.log(`Happy birthday ${name}!`);
}

myEmitter.on('ucapan', birthdayEventListener);
myEmitter.emit('ucapan', 'Rialga');


// Case 2
 
const makeCoffee = (name) => {
    console.log(`Kopi ${name} telah dibuat!`);
};
 
const makeBill = (price) => {
    console.log(`Bill sebesar ${price} telah dibuat!`);
}
 
const onCoffeeOrderedListener = ({ name, price }) => {
    makeCoffee(name);
    makeBill(price);
}
 
myEmitter.on('coffee-order', onCoffeeOrderedListener);
 
myEmitter.emit('coffee-order', { name: 'Tubruk', price: 15000 });