Name("Hello")

function Name(name) {
    console.log(name);
    return name
}

function sum(a, b) {
    return a + b
}
const a = Name(Name("Hello"))
console.log(a);