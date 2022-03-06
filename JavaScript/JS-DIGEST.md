- [JavaScript](#javascript)
	- [Library x Framework](#library-x-framework)
	- [Promises](#promises)
		- [Promise Object](#promise-object)
		- [Execution Order](#execution-order)
	- [Async/await](#asyncawait)
		- [The downsides of async/await](#the-downsides-of-asyncawait)
	- [setTimeout/setInterval](#settimeoutsetinterval)
	- [Canvas API](#canvas-api)


# JavaScript
## Library x Framework

**JavaScript Libraries** — Usually one or more JavaScript files containing custom functions that you can attach to your web page to speed up or enable writing common functionality. Examples include jQuery, Mootools and React.

**JavaScript Frameworks** — The next step up from libraries, JavaScript frameworks (e.g. Angular and Ember) tend to be packages of HTML, CSS, JavaScript, and other technologies that you install and then use to write an entire web application from scratch. The key difference between a library and a framework is *“Inversion of Control”*. When calling a method from a library, the developer is in control. With a framework, the control is inverted: the framework calls the developer's code.

## Promises

1. When a promise is created, it is neither in a success or failure state. It is said to be **pending**.

2. When a promise returns, it is said to be **resolved**.

   - A successfully resolved promise is said to be **fulfilled**. It returns a value, which can be accessed by chaining a `.then()` block onto the end of the promise chain. The executor function inside the `.then()` block will contain the promise's return value.

   - An unsuccessful resolved promise is said to be **rejected**. It returns a **reason**, an error message stating why the promise was rejected. This reason can be accessed by chaining a `.catch()` block onto the end of the promise chain.

A pending promise can either be *fulfilled with a value*, or *rejected with a reason* (error). When either of these options happens, the associated handlers queued up by a promise's `then` method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

### Promise Object

```javascript
const myPromise = new Promise(myExecutorFunc)
	.then(handleFulfilledA)
	.then(handleFulfilledB)
	.then(handleFulfilledC)
	.catch(handleRejectedAny);
```

The termination condition of these functions determines the "settled" (resolved) state of the next promise in the chain. Any **termination other than a** `throw` creates a "resolved" state, **while terminating with a** `throw` creates a "rejected" state.

### Execution Order

```javascript
const promiseA = new Promise( (resolutionFunc,rejectionFunc) => {
  	console.log('Promise logging')
    resolutionFunc(777);
});
// At this point, "promiseA" is already settled.
promiseA.then( (val) => console.log("asynchronous logging has val:",val) );
console.log("immediate logging");
```

returns:

```javascript
Promise logging
immediate logging
asynchronous logging has val: 777
```

## Async/await

The `await` keyword causes the JavaScript runtime to pause your code on this line, allowing other code to execute in the meantime, until the async function call has returned its result. Once that's complete, your code continues to execute starting on the next line.

### The downsides of async/await

Async/await makes your code look synchronous, and in a way it makes it behave more synchronously. The `await` keyword blocks execution of all the code that follows until the promise fulfills, exactly as it would with a synchronous operation. It does allow other tasks to continue to run in the meantime, but your own code is blocked.

## setTimeout/setInterval

You can use recursive `setTimeout()` calls to run a function repeatedly in a similar fashion to `setInterval()`, using code like this:

```javascript
let i = 1;
setTimeout(function run() {
  console.log(i);
  i++;

  setTimeout(run, 100);
}, 100);
```
There is a difference between recursive `setTimeout()` and `setInterval()`:

- Recursive `setTimeout()` guarantees at least the specified amount of time (100ms in this example) will elapse between the executions; the code will run and then wait 100 milliseconds before it runs again. The interval will be the same regardless of how long the code takes to run.

- With `setInterval()`, the interval we choose includes the time taken to execute the code we want to run in. Let's say that the code takes 40 milliseconds to run — the interval then ends up being only 60 milliseconds.

When your code has the potential to take longer to run than the time interval you’ve assigned, it’s better to use recursive `setTimeout()` — this will keep the time interval constant between executions regardless of how long the code takes to execute, and you won't get errors.

## Canvas API

Many operations need to be given coordinates to pinpoint exactly where to draw something — the top left of the canvas is point (0, 0), the horizontal (x) axis runs from left to right, and the vertical (y) axis runs from top to bottom.

![HTML Directions](images/Canvas_default_grid.png)

Graphics operations like drawing rectangles, lines, and so forth are performed in the order in which they occur. Think of it like painting a wall, where each coat of paint overlaps and may even hide what's underneath. You can't do anything to change this, so you have to think carefully about the order in which you draw the graphics.