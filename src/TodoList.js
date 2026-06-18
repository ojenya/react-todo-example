import React, {Component} from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
	constructor(props){
		super(props);
		this.state = {items: []};
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.toggleComplete = this.toggleComplete.bind(this);
	}
	addItem(e){
		if(this._inputElement.value !== ""){
			var newItem = {
				text: this._inputElement.value,
				key: Date.now(),
				completed: false
			};
	
			this.setState((prevState) => {
				return {
					items: prevState.items.concat(newItem)
				};
			});
		
			this._inputElement.value = "";
		}
		console.log(this.state.items);
		e.preventDefault();
	}
	deleteItem(key){
		var filteredItems = this.state.items.filter(function(item) {
			return (item.key !== key);
		});
		
		this.setState({
			items: filteredItems
		});
	}
	toggleComplete(key){
		var updatedItems = this.state.items.map(function(item) {
			if(item.key === key){
				return {
					text: item.text,
					key: item.key,
					completed: !item.completed
				};
			}
			return item;
		});

		this.setState({
			items: updatedItems
		});
	}
	render(){
		return(
			<div className="todoListMain">
			  <div className="header">
			    <form onSubmit={this.addItem}>
			      <input ref={(a) => this._inputElement = a} placeholder="enter task">
			      </input>
			      <button type="submit">add</button>
			    </form>
			    <TodoItems entries={this.state.items} delete={this.deleteItem} toggle={this.toggleComplete} />
			  </div>
		        </div>
		);
	}
}

export default TodoList; 
