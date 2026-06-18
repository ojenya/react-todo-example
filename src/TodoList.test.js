import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate, act } from 'react-dom/test-utils';
import TodoList from './TodoList';

function renderTodoList() {
  const container = document.createElement('div');
  act(() => {
    ReactDOM.render(<TodoList />, container);
  });
  return container;
}

function addItem(container, text) {
  const input = container.querySelector('input[placeholder="enter task"]');
  const form = container.querySelector('form');
  act(() => {
    input.value = text;
    Simulate.submit(form);
  });
}

it('adds new items with completed false', () => {
  const container = renderTodoList();
  addItem(container, 'Buy milk');

  const li = container.querySelector('li');
  expect(li).toBeTruthy();
  const checkbox = li.querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(false);
  expect(li.className).not.toMatch(/completed/);

  ReactDOM.unmountComponentAtNode(container);
});

it('toggles an item completed and back', () => {
  const container = renderTodoList();
  addItem(container, 'Buy milk');

  const li = container.querySelector('li');
  const checkbox = li.querySelector('input[type="checkbox"]');

  act(() => { Simulate.change(checkbox); });
  expect(checkbox.checked).toBe(true);
  expect(li.className).toMatch(/completed/);

  act(() => { Simulate.change(checkbox); });
  expect(checkbox.checked).toBe(false);
  expect(li.className).not.toMatch(/completed/);

  ReactDOM.unmountComponentAtNode(container);
});

it('does not delete an item when the checkbox is clicked', () => {
  const container = renderTodoList();
  addItem(container, 'Buy milk');

  const checkbox = container.querySelector('input[type="checkbox"]');
  act(() => { Simulate.click(checkbox); });

  expect(container.querySelectorAll('li').length).toBe(1);

  ReactDOM.unmountComponentAtNode(container);
});

it('deletes completed items the same way as active ones', () => {
  const container = renderTodoList();
  addItem(container, 'Buy milk');

  const checkbox = container.querySelector('input[type="checkbox"]');
  act(() => { Simulate.change(checkbox); });
  expect(container.querySelector('li').className).toMatch(/completed/);

  act(() => { Simulate.click(container.querySelector('li')); });
  expect(container.querySelectorAll('li').length).toBe(0);

  ReactDOM.unmountComponentAtNode(container);
});
