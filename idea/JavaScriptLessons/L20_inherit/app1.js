/**
 * Created by tongmeiyan on 2016/9/10.
 */
//封装：可以隐藏私有属性，以防止外部访问，如变量n
// (function(){
//    ...
//  window.xxx = xxx; //将此对象传给 window
// })();
// 此处为 组合构造函数模式和原型模式创建对象，组合继承

(function(){
	function A(name){
		this.name = name;
		console.log("A Constructor");
	}
	A.prototype.sayHello = function(){
		console.log("A: hello, " + this.name);	
	};
	window.A = A;
})();
var a = new A("Echo");
console.log(a.name);
a.sayHello();


(function(){
	function B(name){ //B类的构造函数
		A.call(this, name); //扩展A类的作用域到B类：则B继承A的属性
		console.log("B Constructor");
	}
	B.prototype = new A();  //定义B类的原型：继承A的原型
	B.prototype.constructor = B;
	var superFun = B.prototype.sayHello;
	B.prototype.sayHello = function(){ //修改B类的原型
		superFun.call(this); //保存继承部分
		console.log("B: hello, "+ this.name); //增加新的内容
	};
	window.B = B;
})();
var b1 = new B("Emma");
console.log(b1.name);
b1.sayHello();
var b2 = new B("Jane");
console.log(b2.name);
b2.sayHello();
