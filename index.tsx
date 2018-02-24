import * as React from 'react';
import * as ReactDOM from 'react-dom';


let g_id = 0,i=0;
interface IState {
	state: "all" | "active" | "completed"
	todos : {
		
		id : number
		todo : string
		active : boolean
	}[]

}

class Todos extends React.Component<{},IState> {
	constructor(props:any, context : any) {
		super(props,context);

		this.state = {
			state : "all",
			todos : []
		}

	}
	addTodo(text:string) {
		this.setState( {
			todos :[
				
				{
					id:g_id++,
					todo : text,
					active : true
				},
				...this.state.todos
			],state : "all",
		})
	}
	delTodo(id:number) {
		this.setState( {
			todos : this.state.todos.filter((todo)=>todo.id!=id),
		})
	}
	toggleTodo(id:number) {
		this.setState( {
			todos : this.state.todos.map((todo)=>{
				if(todo.id==id) {
					return {
						...todo,
						active: todo.active==true?false:true
					}

				}
				return todo;
			})
			
		})
	}
	deleteAll() {
		this.setState( {
			todos : []
		})
	}
	completeAll() {
		this.setState( {
			todos : this.state.todos.map((todo)=>{
				return {
					...todo,
				active : false
				}
			})
		})
	}
	keyDown(e:React.KeyboardEvent<HTMLInputElement>) {
		if(e.keyCode==13 ) {
			let target = e.target as HTMLInputElement;
			if((target.value!="") && (target.value.trim()!="")) {
				this.addTodo(target.value);
				target.value = "";
			}

		}

	}
	toggleState(opt:string) {
		if(opt=="all")
			return "todosAll";
		else if(opt=="active")
			return "todosActive";
		else 
			return "todosCompleted"

		
	}
	render() {
			let all=0,active=0,completed=0;

			let todosAll =this.state.todos.map((todo)=> {
					if(todo.active) 
						active++;
					else
						completed++;
					all++;

					return <div className="todo" key = {todo.id}>
					<span className="todo">{todo.todo}</span>
					<button  className="delete" onClick = {()=>{this.delTodo(todo.id);}}>Delete</button>
					<button  className="toggle" onClick = {()=>{this.toggleTodo(todo.id);}}>{(todo.active)?"active":"Completed"}</button>
					</div>
				})
			let todosActive =	this.state.todos.map((todo)=> {
				if(todo.active)
					return <div className="todo" key = {todo.id}>
					<span className="todo">{todo.todo}</span>
					<button  className="delete" onClick = {()=>{this.delTodo(todo.id);}}>Delete</button>
					<button className="toggle" onClick = {()=>{this.toggleTodo(todo.id);}}>{(todo.active)?"active":"Completed"}</button>
					</div>
				})
			let todosCompleted = this.state.todos.map((todo)=> {
				if(!todo.active)
					return <div className="todo" key = {todo.id}>
					<span className="todo">{todo.todo}</span>
					<button  className="delete" onClick = {()=>{this.delTodo(todo.id);}}>Delete</button>
					<button className="toggle" onClick = {()=>{this.toggleTodo(todo.id);}}>{(todo.active)?"active":"Completed"}</button>
					</div>
				})
		return <>
			<div className="todos">
				<div className="header">Todos</div>
				<div className="body">
					<input type="text"  placeholder ="Enter the Todo here!!"className="input" onKeyDown={(e)=>{
										this.keyDown(e)}}/>;
					{ (this.state.state!="all"?(this.state.state=="active")?todosActive:todosCompleted:todosAll)}

				</div>
				<div className="footer">
					<div className="all" onClick = {()=> {
						this.setState ({
							state : "all"
						})
					}}>ALL{(all>0)?<span>{(all)}</span>:""}</div>
					<div className="active"  onClick = {()=> {
						this.setState ({
							state : "active"
						})
					}}>Active{(active>0)?<span>{(active)}</span>:""}</div>
					<div className="completed"  onClick = {()=> {
						this.setState ({
							state : "completed"
						})
					}}>Completed{(completed>0)?<span>{(completed)}</span>:""}</div>
				</div>
			</div>
		</>
	}
}
ReactDOM.render(<Todos/>,document.getElementById('app'));