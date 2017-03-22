
window.onload = function(){
	var titleObj = document.getElementById('title').getElementsByTagName('li');
	var contentObj = document.getElementById('content').getElementsByTagName('div');
	
	if(contentObj.length !== titleObj.length){
		return;
	}
	
	for(var i=0; i<titleObj.length; i++){
		titleObj[i].index = i; //创建这个index是为了匹配title和content
		titleObj[i].onmouseover = function(){
			for(var j=0; j<titleObj.length; j++){
				titleObj[j].className = '';
				contentObj[j].style.display = 'none';
			}
			this.className = 'selected';
			contentObj[this.index].style.display = 'block';//闭包中无法访问变量i
		};
	}
}