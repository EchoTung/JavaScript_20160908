/**
 * Created by tongmeiyan on 2016/9/10.
 */
//封装：可以隐藏私有属性，以防止外部访问，如变量n
// (function(){
//    ...
//  window.xxx = xxx; //将此对象传给 window
// })();
// 此处为 工厂模式创建对象，工厂模式继承

(function(){
	var n = 10; //私有变量
	function Person(name){
		var _this = {};
		_this.name = name;
		_this.sayHello = function(){ //闭包
			console.log("pHello, " + _this.name + " : " + n);
		};
		console.log("Person Constructor");
		return _this;
	}
	window.Person = Person;
})();
var p = Person("Echo");
console.log(p.name);
p.sayHello();


(function(){
	function Teacher(name){
		var _this = Person(name);
		var superFun = _this.sayHello;
		_this.sayHello = function(){ //闭包
			superFun.call(this);
			console.log("tHello, " + _this.name);
		};
		console.log("Teacher Constructor");
		return _this;
	}
	window.Teacher = Teacher;
})();

var t = Teacher("Jane");
console.log(t.name);
t.sayHello();
