import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils';
import TodoList from './TodoList';

it('adds a new task with completed false', () => {
  const instance = renderIntoDocument(<TodoList />);
  const form = findDOMNode(instance).querySelector('form');
  const input = form.querySelector('input');

  input.value = 'Buy milk';
  Simulate.submit(form);

  const items = scryRenderedDOMComponentsWithTag(instance, 'li');
  expect(items.length).toBe(1);
  const checkbox = findDOMNode(instance).querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(false);
  expect(items[0].className).not.toContain('completed');
});

it('toggles a task completed and back', () => {
  const instance = renderIntoDocument(<TodoList />);
  const form = findDOMNode(instance).querySelector('form');
  const input = form.querySelector('input');

  input.value = 'Buy milk';
  Simulate.submit(form);

  const checkbox = () => findDOMNode(instance).querySelector('input[type="checkbox"]');
  const listItem = () => scryRenderedDOMComponentsWithTag(instance, 'li')[0];

  Simulate.change(checkbox());
  expect(checkbox().checked).toBe(true);
  expect(listItem().className).toContain('completed');

  Simulate.change(checkbox());
  expect(checkbox().checked).toBe(false);
  expect(listItem().className).not.toContain('completed');
});

it('still deletes a task', () => {
  const instance = renderIntoDocument(<TodoList />);
  const form = findDOMNode(instance).querySelector('form');
  const input = form.querySelector('input');

  input.value = 'Buy milk';
  Simulate.submit(form);
  expect(scryRenderedDOMComponentsWithTag(instance, 'li').length).toBe(1);

  Simulate.click(scryRenderedDOMComponentsWithTag(instance, 'li')[0]);
  expect(scryRenderedDOMComponentsWithTag(instance, 'li').length).toBe(0);
});
