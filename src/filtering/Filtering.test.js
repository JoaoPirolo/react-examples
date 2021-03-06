import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Filtering from './Filtering';

describe('Filtering spec...', () => {
    it('should render', () => {
        let component = <Filtering options={[]} />,
            container = document.createElement('div'),
            mainElement, input, suggestions;
        ReactDOM.render(component, container);
        mainElement = container.querySelectorAll('div.filtering');
        input = container.querySelectorAll('input');
        suggestions = container.querySelectorAll('ul');
        expect(mainElement.length).toBe(1);
        expect(input.length).toBe(1);
        expect(suggestions.length).toBe(1);
    });

    it('should show render all elements', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions;
        ReactDOM.render(component, container);
        suggestions = container.querySelectorAll('li');
        expect(suggestions.length).toBe(3);
        expect(suggestions[0].textContent).toBe('Abobrinha');
        expect(suggestions[1].textContent).toBe('Pepino');
        expect(suggestions[2].textContent).toBe('Uva');
    });

    it('should sort all elements', () => {
        let options = [{name: 'Uva'}, {name: 'Abobrinha'}, {name: 'Pepino'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions;
        ReactDOM.render(component, container);
        suggestions = container.querySelectorAll('li');
        expect(suggestions.length).toBe(3);
        expect(suggestions[0].textContent).toBe('Abobrinha');
        expect(suggestions[1].textContent).toBe('Pepino');
        expect(suggestions[2].textContent).toBe('Uva');
    });

    it('should filter options based on input', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        input.value = 'Ab';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.keyUp(input, {});
        suggestions = container.querySelectorAll('li');
        expect(suggestions.length).toBe(1);
        expect(suggestions[0].textContent).toBe('Abobrinha');
    });

    it('should select a value based on a click', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, pepino, input;
        ReactDOM.render(component, container);
        pepino = container.querySelectorAll('li')[1];
        input = container.querySelector('input');
        ReactTestUtils.Simulate.click(pepino);
        expect(input.value).toBe('Pepino');
    });

    it('should move the selected element using down arrow', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Abobrinha');
        expect(selected.textContent).toBe('Abobrinha');
    });

    it('should move the selected element using down arrow multiple times', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Uva');
        expect(selected.textContent).toBe('Uva');
    });

    it('should move the selected element using up arrow', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 38});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Pepino');
        expect(selected.textContent).toBe('Pepino');
    });

    it('should not move the selected element using up arrow to less than 0', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 38});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 38});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Abobrinha');
        expect(selected.textContent).toBe('Abobrinha');
    });

    it('should not move the selected element using up arrow to more than max', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Uva');
        expect(selected.textContent).toBe('Uva');
    });

    it('should not move the selected element using up arrow to more than max', () => {
        let options = [{name: 'Abobrinha'}, {name: 'Pepino'}, {name: 'Uva'}],
            component = <Filtering options={options}/>,
            container = document.createElement('div'),
            suggestions, selected, input;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        ReactTestUtils.Simulate.focus(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        input.value = 'Ab';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.keyUp(input, {keyCode: 40});
        selected = container.querySelector('li.selected');
        expect(input.value).toBe('Abobrinha');
        expect(selected.textContent).toBe('Abobrinha');
    });
});
