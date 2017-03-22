/**
 * Created by tongmeiyan on 2016/9/8.
 */
//创建对象 原型方法：
function A(){
}
A.prototype.sayHello = function(){
	console.log("A, hello!");
}
A.prototype.sayGoodbye = function(){
	console.log("A, goodbye!");
}
A.sayHi = function(){   //没有 prototype 则不能被实例引用
	console.log("A, hi!");
}
var aa = new A();
aa.sayHello();
aa.sayGoodbye();
//aa.sayHi(); //不能引用
A.sayHi();

//继承 原型方法
function B(){
}
B.prototype = new A(); //修改 B 类的原型并指向 A 类，则继承 A 类
B.prototype.sayHello = function(){  //重载超类方法
	console.log("B, hello!");
}
B.prototype.sayNight = function(){  //新增子类方法
	console.log("B, goodnight!");
}
var bb = new B();
bb.sayHello();   //重载超类方法
bb.sayNight();   //新增子类方法
bb.sayGoodbye(); //引用超类方法

//创建对象 构造函数方法
function C(){
	this.sayHello = function(){
		console.log("C, hello!");
	}
}
var cc = new C();
cc.sayHello();
