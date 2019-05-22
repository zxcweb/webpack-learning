import a from './a';
import './index.css';
import '@babel/polyfill';
import imgSrc from './组13拷贝2.png';

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
let img = document.createElement("img");
img.src = imgSrc;
document.body.appendChild(img)
