const f= () => "fat arrow function";
console.log("no parameters: "+f());

const a=b => 5;
console.log(a(5));

const mul= (a,b) => a*b;
console.log("mul: "+mul(1,2));

const add=(a,b,c) => a+b+c;
console.log("add: "+add(1,2,3));

const ad=(...a)=>
{
    let sum=0;
    for(i=0;i<a.length;i++)
    {
        sum=sum+a[i];
    }

    return sum;
}
console.log("multiple parameters: "+ad(1,2,3,4,5));

