//An object that wraps another Object and intercepts fundamnental operations on proxy object.
//Proxy allow us to create custom behaviour for these operation such as iinterceptiing property access , assignment , method invocation and more .
//They are used for implementing things like validation , logging ,security checks data mannuipulation . To create a proxy we can use proxy contructor
//The constructor takes 2 arguement : 1. the object and a handler object



const target = {
    name:"Javascript",
    age:0
};

//handler object with traps
const handler = {
    get: function(target,property){
        console.log(`Getting ${property}`);
        return target[property];
    },
    set: function(target,property,value){
        console.log(`Setting ${property} to ${value}`);
        target[property]=value;
    },

}



//create proxy

const proxy = new Proxy(target,handler);
console.log(proxy.name); //getter is called
proxy.age=0;
//other methods are get , set , apply(target,thisArg,arguementList) , construct(target,arguementList,newTarget) , has(target,property) , deleteProperty(target,property)


//Proxy Validation example  basically used for validation to check or handle exception by sending data to proxy if it succeeds then no error we can send that data to any functionJA

const useValidate={
    set:function(target,property,value){
        if(property=="age" && typeof value!=="number" || value<0)
        {
          throw new Error('Invalid age count');
        }
        if(property=="name" && typeof value!=="string" )
        {
          throw new Error('Invalid name value givenn');
        }
        target[property]=value;
        return true;
        
    }
}

const validation = new Proxy({},useValidate);

try{
    validation.name="Javascript";
    validation.age=-1
}
catch(error)
{
    console.log("Threw an error"+error.message);
}

console.log("Name " + validation.name);
console.log("Age with no error " +validation.age);