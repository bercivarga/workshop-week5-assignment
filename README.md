# Week 5 Assignment

Welcome to week 5's assignment!

This week, you need to use your freshly obtained data-fetching knowledge in order to create your very own Pokedex. In addition, you'll need to do some reading as well to dive a bit deeper into asynchronous JavaScript with Promises and the Event Loop.

I won't include any files besides this `README.md`, as you already know how to set up a JavaScript project.

## Requirements for the project:
- You are rendering a list of pokemon coming from [this api](https://pokeapi.co/).
- You style the app properly, not just barebones HTML. I'll leave the design up to you.
- Make your app responsive. I'd like to see your app work on mobile screens as well.
- Handle potential errors in your code. We don't want to see it break.
- Render some fallback UI on bad requests.
- For an extra challenge, add a searchbar that allows users to search for pokemons.

## Readings:
- [Event loop](https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd)
- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&vl=en)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

### Some tips:
- Use the `innerHTML` property on DOM elements together with template literals to dynamically add HTML to your live application.
- Don't forget to call `.then()` after each promise resolves.
- Read through the documentation of the API. You have to search for the required endpoint.
- For inspiration, see this project: [my pokedex project](https://vanilla-poke.netlify.app/)

![POKEMON](https://cdn.booooooom.com/wp-content/uploads/2016/07/pokemon-go-charactersilhouettes-complete001.jpg "Pokedex")