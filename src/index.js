import a from './a';
import './index.css';
import '@babel/polyfill';

const al = () =>{
    return a;
}
@log
class A{
    aa = 123;
}
function log(target){
    console.log(target,12)
}
alert(al())
let abc = new A();
alert(abc.aa)
alert('aaa'.includes("a"))
console.log($)