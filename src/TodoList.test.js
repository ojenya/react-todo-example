import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate, act} from 'react-dom/test-utils';
import TodoList from './TodoList';

let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	ReactDOM.unmountComponentAtNode(container);
	document.body.removeChild(container);
	container = null;
});

function render(component) {
	act(() => {
		ReactDOM.render(component, container);
	});
}

function addTask(text) {
	const input = container.querySelector('input[placeholder="enter task"]');
	act(() => {
		input.value = text;
		Simulate.submit(container.querySelector('form'));
	});
}

describe('TodoList completion feature', () => {
	it('renders without crashing', () => {
		render(<TodoList />);
	});

	it('new task defaults to completed:false', () => {
		render(<TodoList />);
		addTask('Buy milk');
		const checkbox = container.querySelector('input[type="checkbox"]');
		expect(checkbox).not.toBeNull();
		expect(checkbox.checked).toBe(false);
		const span = container.querySelector('li span');
		expect(span.className).not.toContain('completed');
	});

	it('clicking checkbox marks task complete with strikethrough class', () => {
		render(<TodoList />);
		addTask('Buy milk');
		const checkbox = container.querySelector('input[type="checkbox"]');
		act(() => {
			Simulate.change(checkbox, {target: {checked: true}});
		});
		expect(checkbox.checked).toBe(true);
		expect(container.querySelector('li span').className).toContain('completed');
	});

	it('clicking checkbox again unmarks the task', () => {
		render(<TodoList />);
		addTask('Buy milk');
		const checkbox = container.querySelector('input[type="checkbox"]');
		act(() => {
			Simulate.change(checkbox, {target: {checked: true}});
		});
		act(() => {
			Simulate.change(checkbox, {target: {checked: false}});
		});
		expect(checkbox.checked).toBe(false);
		expect(container.querySelector('li span').className).not.toContain('completed');
	});

	it('clicking the checkbox does not delete the task', () => {
		render(<TodoList />);
		addTask('Buy milk');
		const checkbox = container.querySelector('input[type="checkbox"]');
		act(() => {
			Simulate.click(checkbox);
		});
		expect(container.querySelectorAll('li').length).toBe(1);
	});

	it('deleting a task still works', () => {
		render(<TodoList />);
		addTask('Buy milk');
		const li = container.querySelector('li');
		act(() => {
			Simulate.click(li);
		});
		expect(container.querySelectorAll('li').length).toBe(0);
	});

	it('can add and delete multiple tasks', () => {
		render(<TodoList />);
		addTask('Buy milk');
		addTask('Walk dog');
		expect(container.querySelectorAll('li').length).toBe(2);
		act(() => {
			Simulate.click(container.querySelector('li'));
		});
		expect(container.querySelectorAll('li').length).toBe(1);
	});
});
