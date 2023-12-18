function y()
{
    console.log("function before callback");
}
function callback()
{
    console.log("call back function");
}

function x()
{
    console.log("function after callback");
}

y();
setTimeout(callback,2000);
x();