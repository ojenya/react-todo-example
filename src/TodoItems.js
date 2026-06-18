import React, {Component} from "react";

class TodoItems extends Component {
	constructor(props){
		super(props);
		this.createTasks = this.createTasks.bind(this);
		this.toggle = this.toggle.bind(this);
	}
	createTasks(item){
		return (
			<li
				onClick={() => this.delete(item.key)}
				key={item.key}
				className={item.completed ? "completed" : ""}
			>
				<input
					type="checkbox"
					checked={item.completed}
					onClick={(e) => e.stopPropagation()}
					onChange={() => this.toggle(item.key)}
				/>
				{item.text}
			</li>
		);
	}
	delete(key){
		this.props.delete(key);
	}
	toggle(key){
		this.props.toggle(key);
	}
	render(){
		var todoEntries = this.props.entries;
		var listItems = todoEntries.map(this.createTasks);

		return(
			<ul className="theList">
				{listItems}
			</ul>
		);
	}
};

export default TodoItems;
