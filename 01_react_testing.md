# Testing React Components

**Lesson Duration**: 60 minutes

### Learning Objectives

- Understand what Enzyme is and how to use it
- Be able to unit test properties and methods.

## Intro

Over the next 2 lessons we are going to learn how to test React components.

We will test in 2 ways:

- Unit testing - Test our components and functions work properly.
- e2e testing - Test the full app to make sure it renders correctly in the browser.

Testing in this way will increase confidence in the code that you write and for a lot of development teams it is a requirement. It also ensures that any changes made to the code won't break anything as the tests are normally ran before any build is released.

### Unit testing with Enzyme.

We will be using a library called Enzyme for our unit tests. It is used in conjunction with Jest, which is a JavaScript testing framework that allows the developer to test API calls, mockups and UI components. (Note: that can also be used without Jest)

The structure of the tests is very similar to `Mocha`.

Enzyme is a DOM testing library, which means that instead of dealing with instances of rendered React components, it handles DOM elements and how they behave in front of real users.

Some key things to remember when using these tools are:

`it`: describes the test itself. It takes in the name of the test and a function that perfroms the actual test.

`expect`: the condition that the test needs to pass. In our case React testing library will give us access to matcher methods used to compare our expected result.

`matcher`: a function that is applied to the expected condition.

`render`: the method used to render a given component.

`snapshot`: allows us to save the structure of a given component at any point in time and use it to compare for any changes.


## Creating our first test

> Download and open the start point and do an `npm install`.

Start the app and have a look at it in the browser. 

The app we will be testing in this lesson is our comments code from earlier. But we have added a counter component to the top of the app to demonstrate interacting with DOM elements from the tests. 

> Stop the server.

Next we need to install Enzyme. Alongside this we need to install an adaptor so that if there are any changes to React version this adapter can cope with those. 

```bash
npm install --save-dev enzyme enzyme-adapter-react-16

```

Let's write our first test. Go to the `tests` folder and open `Counter.test.js`. This naming convention is important. When we run the script `npm test`, React will look in our tests folder for files with a `.test.js` or `.spec.js` extension. This is how it knows which test files to run.

In `Counter.test.js` we will import a few things.

```js
// Counter.test.js

import React from 'react';
import Counter from '../components/Counter';
import Adapter from 'enzyme-adapter-react-16' // ADDED
import { shallow, configure } from 'enzyme'; // ADDED


```

Here we are importing React as usual along with the component we want to test. But we are also importing a couple of methods from the Enzyme and the adapter as well. `shallow` is what we will use to essentially mount the component so that we can access DOM nodes like we would normally in a browser. 

We can use `shallow` to just render this component or we could use `mount` to render any sub-components as well. We are only rendering the `Counter` so we will use `shallow`.

`configure` will allow us to create a new Adapter for enzyme to use with React. 

To start with we will shallow mount our Counter component in a `beforeEach` block so that we are sure the component is fresh for each test. 

`shallow` returns us a `Reactcontainer` with a number of useful methods to use in our tests which we will look at throughout this lesson. To render our component we pass in `JSX` like we normally do in our React components.

The next thing we will do is call configure and create a new adapter for Enzyme to work with React. We will do this just aove the `beforeEach` block.


```js
// Counter.test.js
import Adapter from 'enzyme-adapter-react-16' 
import { shallow, configure } from 'enzyme'; 

configure({ adapter: new Adapter()}); // ADDED
```
And lastly we will mount the Counter component inside the `beforeEach`. To access this in the tests we will create a variable just above as well. 


```js
// Counter.test.js

import React from 'react';
import {render} from '@testing-library/react'
import App from '../App';


describe('Counter', () => {

  let container; // ADDED
  beforeEach(() => {
    container = shallow(< Counter />); // ADDED
  });
    
}) 
```

Now in our `beforeEach` block we have rendered the Counter component. When we call `shallow` we are returned a container which holds our mounted component. This gives us access to the DOM elements in the component. We can also call methods that the container gives us as well.

## Testing DOM elements.

Take a while to have a look at the code in the project. It is an application with a few moving parts that we will be testing. There is a counter with 2 buttons, a list of comments and a form to add a new comment. We will be testing the different components in slightly different ways to give you a broad overview of the testing strategies.

Take a particular look at the `Counter.js` file in the `components` folder.

## Knowing what to unit test

The most common question about unit testing components is "what exactly should I test?"

For unit testing we will test the methods that we have written and their effect on the data.

For end to end testing we will test the events and the effect on what is rendered in the UI.

We should always start here by identifying the business logic in our app.

For `Counter.js` we will check:

Unit Tests:

- It should start the counter state at 0.
- It should be able to increment and decrement the counter

## Setting up a unit test

So complete the first test. 

We will check that the text for the counter starts at `0`.

Unfortunately with React hooks such as useState, we are unable to directly access the state from our tests. We can only access the DOM elements. But that is OK. As long as our app works we should have an `h1` with text content of "0".

Lets get access to that DOM element. (Similarly to how we did it with querySelector!)

To do this the Enzyme container gives us a method called `find()`. Into this we can pass a CSS selector (element type/class/id).

`find` will give us one or more elements back. 

For example if we called `find('li')` it would give us back an array of all the `li` elements in the dom. If there is only a single matching `li` it only gives us the single element. 

Our h1 has an id of `counter` so we can pass that in.

```js
// Counter.test.js

describe('Counter', () => {
 //AS BEFORE 

  let container;
  beforeEach(() => {
    container = shallow(< Counter />);
  });

  it('should start the counter at zero', () => {
    const counter = container.find('#counter'); // ADDED
  }); // ADDED
    
})

```
 We will then make sure that the text content is `0`. To find the text content of an element we get a new method called `text()` to call. 

 Emzyme also gives us access to assert results. We can use a method called `expect` and pass it the actual value. (So in this case the text in the H1). From there we can chain the expectation. Here we `expect` the `text` to equal `0`


```js
// Counter.test.js

it('should start the counter at zero', () => {
    const counter = container.find('#counter'); 
    expect(counter.text()).toEqual('0'); // ADDED
  }); 
```

And now let's run `npm test` in terminal again.

Awesome our tests are passing!


## Testing events

Next we will test that the state is updated when we increment or decrement the count using the buttons. (Essentially we are testing the result of calling the 2 methods inside our component)

In order to simulate a button click to trigger the method call when we find an element we get a handy method, funnily enough called `simulate`. Into this method we can pass in various events that could be triggered; `click`, `change`, etc.


Let's start by unskipping and completing the test:

First we will find the up button and simulate a click.

```js
// Counter.test.js
it("should increment counter on click", () => {     // MODIFIED
    container.find("#button-up").simulate("click"); // ADDED
    
  });
```


And now we can check that the counter H1 element has the text `1`.

```js
// Counter.test.js

it("should increment counter on click", () => {
    container.find("#button-up").simulate("click");
    const counter = container.find("#counter"); // ADDED
    expect(counter.text()).toEqual('1'); // ADDED
  });
```

When we save these changes our test runner should trigger again and we should now have 3 passing tests! (1 test from App and 2 from Counter)

### Task

Unskip and complete the test to decrement the counter. You should expect the H1 to have the text `-1`.


<details>
<summary>Solution</summary>

```js
// Counter.test.js
  it("should decrement counter on click", () => {
    container.find("#button-down").simulate("click");
    const counter = container.find("#counter");
    expect(counter.text()).toEqual('-1');
  });
```
</details>

And that is us! We can test any event and the effect that it has on the state of our component.

Ideally we should be testing that our state is set correctly initially and any methods we write that will modify the data or DOM components.

Next we will look at e2e testing to make sure that our UI is displayed correctly.

## Recap

What are some of the advantages of testing?

<details>
<summary>Answer</summary>
Tests help a developer think about how to design a component, or refactor an existing component, and are often run every time code is changed. It also instils confidence in your code.
</details>

<br />

## Conclusion

Now that we can test our React components there is no stopping us!

A good mindset to have when testing components is to assume a test is necessary until proven otherwise.

Here are the questions you can ask yourself:

- Is this part of the business logic?
- Does this directly test the inputs and outputs of the component?
- Is this testing my code, or third-party code?
