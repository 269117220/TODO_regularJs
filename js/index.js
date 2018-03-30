var component=Regular.extend({
	template:'#todoTemplate',
	deleteCompleted:function(){
	   var todos=this.data.todos,todoTemp=[];
       todos.forEach(function(todo,index){
           if(!todo.checked){
           	  todoTemp.push(todo);
           }
       });
       this.data.todos=todoTemp;
	},
	edit:function(elem){
	  if(elem.target.getAttribute('class')=='todoInfo'){
      	elem.target.removeAttribute('disabled');
      	elem.target.style="background:#FFFFF0;border:1px solid #ddd;flex-basis:482px;";
      	elem.target.nextSibling.nextSibling.style="display:none";
      	elem.target.nextSibling.nextSibling.nextSibling.nextSibling.style="display:none";
	  	elem.target.focus();
	  }
	},
	blur:function(elem){
      elem.target.setAttribute('disabled','disabled');
      elem.target.style="background:white;border:1px solid #FFF;flex-basis:357px;";
      elem.target.nextSibling.nextSibling.style="display:inline-block";
      elem.target.nextSibling.nextSibling.nextSibling.nextSibling.style="display:inline-block";
	}, 
	addTodo: function(editTodo){
      var data = this.data;
      if(editTodo.trim().length){
         data.todos.unshift({createTime:getCurrTime(),edit:false,checked:false,textInfo:editTodo});
         data.editTodo = "";
      }
    },
    changeCheck:function(e){
    	var flag=e.target.checked;
    	this.data.todos.forEach(function(item){
             item.checked=flag;
    	});
    },
    getCheckedLen:function(){
    	var number=0;
    	this.data.todos.forEach(function(item){
            if(item.checked)
               number++;    
    	});
       return number;
    }
});

Regular.event('enter', function(element, fire){
  Regular.dom.on(element, 'keypress', function(ev){
    if(ev.which === 13) fire(ev)
  })
})

var todos=[];
var obj={
	data:{
		todos:todos,
	    currShow:'all'
	}
}
Regular.filter('filterTodos',function(todos){
    if(obj.data.currShow=='all')
    	return todos;
    else if(obj.data.currShow=='active'){
    	return todos.filter(function(item){
             return !item.checked;
    	});
    }else if(obj.data.currShow=='completed'){
    	return todos.filter(function(item){
             return item.checked;
    	});
    }
})
var app=new component(obj);
app.$inject('#container');