class foo{
    a = () => console.log("foo");
    b = () => console.log("foo2");
}
class bar{
    a = () => console.log("bar");
    b = () => console.log("bar2");
}

module.exports = {foo,bar}