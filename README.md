# Spotify Web Player Clone

This is my first full-stack application, consisting of a React front-end written in TypeScript and built with Vite, supported by a Node Express server, written in JS.

This repository contains the front-end portion of the project, intended to work alongside an [auth/api server](https://github.com/nednella/spotify-server).

![project showcase](src/assets/readme/showcase.jpg)

## Installation

Clone the repository

```sh
git clone git@github.com:nednella/spotify-client.git
```

Navigate to the cloned repository and install the dependencies

```sh
npm install
```

Run the application locally

```sh
npm run dev
```

You are also required to follow the installation instructions for the server, [found here](https://github.com/nednella/spotify-server).

## Motivation

I have covered numerous common learning development projects that are, quite frankly, repetitive and boring, although valuable at the time of building them. Prior to this project, I had not yet touched a modern front-end framework, nor handled any kind of server hosting a web API.

I'm a long-time Spotify user, and have known about Spotify's [Web API](https://developer.spotify.com/documentation/web-api) and [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) offerings for a while now. Ever since, there has been a long-term goal of writing my own clone from scratch, so here we are!

### The goal behind this project was to cover the following learning points

-   Build a solid understanding of the React framework
-   Build a good, general understanding of writing and running servers to support front-end clients
-   Learnt to engage with TypeScript, starting a long-term goal of replacing plain JS entirely

### As such, I've opted to include a number of dependencies to help cover these points

-   [Zustand](https://github.com/pmndrs/zustand) for handling client-side state
-   [React Query](https://github.com/TanStack/query) for handling server-side state
-   [Axios](https://github.com/axios/axios) for handling client-server communication
-   [Tailwind](https://github.com/tailwindlabs/tailwindcss) for component styling
-   [Radix UI](https://github.com/radix-ui) for complex UI components
-   [Embla Carousel](https://github.com/davidjerleke/embla-carousel) for carousel components, to fill a gap in Radix's current offering

## Architecture

The project began with _a lot_ of research into how modern full-stack web applications are often built, and how client authentication and sessions are handled in the real world. Since the Spotify API uses the OAuth2.0 framework to provide authorisation to their web API, I investigated application architecture patterns designed around this.

### Architecture Pattern

After investigating numerous types of [OAuth architecture patterns](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-application-architecture-pa), I elected to follow the [Backend For Frontend (BFF)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-backend-for-frontend-bff) pattern, as it best aligned with the goals of my project. In hindsight, this was not the best decision. More on that later.

With this pattern in mind, I would require a backend to act as a mediary for all OAuth and API interactions between the client and Spotify's resouces. For some reason, I opted to build the project as a polyrepo, so you can find the backend [here](https://github.com/nednella/spotify-server)!

![architecture pattern](src/assets/readme/flowcharts/backend-for-frontend-architecture-pattern.png)

### Authorisation Flow

The Spotify Web API offers [numerous authorisation flows](https://developer.spotify.com/documentation/web-api/concepts/authorization) supported by the **OAuth2.0** framework. Their offerings aid to cover all application types, from long-standing applications running on a server, to SPAs running in the browser. As this project is intended to be a full-stack application, the [authorisation code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) was used to handle user authentication across the app.

![authentication flow](src/assets/readme/flowcharts/auth-code-flow.png)

### Session Management

The BFF pattern should rely on browser cookies (see: [Cookie-based Session Management](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-cookie-based-session-manage)) for tracking user sessions within the client.

I originally envisioned a server hosted by a service provider that would manage client sessions for individual users, so elected to use server-based cookie sessions via the [express-session](https://github.com/expressjs/session) middleware package. This would enable me to fine-tune cookie security as well as session storage. For testing and development, I could use the default MemoryStore instance, and easily connect a 3rd party database storage mechanism for production.

I quickly discovered that if I wanted to host both client and server publicly, I would require an [extension request](https://developer.spotify.com/documentation/web-api/concepts/quota-modes) on my Spotify Application via the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). However, after reading through their [developer policy](https://developer.spotify.com/policy) for approving applications, a replica of their web service and storage of user auth tokens within a 3rd party database is not something they would allow!

As a result, the application would be built with local hosting in mind only, but still using the same secure server-based cookie mechanism outlined above, with the [recommended cookie security](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-cookie-security).

### The Result

1. The user begins the authorisation flow by signing in via the Spotify authentication redirect and grants access to the application for the requested resources (presented in the form of authorisation scopes).

2. The sign-in page redirects the user back to the client, and provides the client with an authorisation code.

3. The client sends the authorisation code to the backend, where the backend acts as a mediary and sends a request containing the code to Spotify's auth token endpoint.

4. On success, the endpoint returns a response containing the relevant token data in the body.

5. The token information is stored within the session store on the server, and a secure cookie containing a session ID is sent to the client browser, enabling the client to present the user with a "logged in" state.

6. On subsequent API requests, the client automatically sends the cookie along with, which is first checked for validity via a session auth middleware, then checked for token expiry via a follow-up middleware. Finally, the token is sent along with any additional relevant information to the relevant Spotify API endpoint, and data (if applicable) is returned to the client.

### In Hindsight

In hindsight, I should have elected to use the [Token-Mediating Backend](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-token-mediating-backend) architecture for the project.

Although the BFF implementation was great for bundling multiple streams of data into one response to the client (e.g., when visiting an artist's page, the backend sends requests multiple resources in parallel, and then responds to the client request with 1. Artist information, 2. Aritst's top tracks, 3. Artist's singles & albums, 4. Related artists), it unfortunately became rather cumbersome when dealing with paginated data.

Spotify's API is fantastic and provides easy-to-use paginated data from their endpoints. It provides easy-access URLs to send subsequent requests to for neighbouring pages, which work best without a mediary intercepting every request. An example of their paginated data looks like the following:

```js
{
  "href": "https://api.spotify.com/v1/me/shows?offset=20&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=401&limit=20",
  "total": 100,
  "items": [...]
}
```

As such, it would make sense to continue using a backend to handle authentication and sessions for security (as in my experience from this project, it worked fantastically!), but provide direct access to Spotify's resource servers from the client for follow-up requests.

Realistically, this project, given it's only intended to be a locally-hosted client, would make the most sense to follow the [browser-based OAuth2.0 client](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps#name-browser-based-oauth-20-clie) architecture though, since browser security is not actually something that needs to be dealt with here.

As an additional note, I should have also designed this project as a monorepo, as it's much more convenient to use and I didn't actually benefit in any way from setting it up as a polyrepo, other than enabling me to separate my git work flows for each half. I could have just used branches for that!

Nonetheless, it was an extremely fun application architecure learning curve and I learned to handle multiple hiccups and unexpected changes of direction along the way.

## Improvements

Given that this is my first full-stack application, and my first time using React, there are plenty of improvements that can be made for next time (I will definitely be coming back to this one in the future!).

The project was very much a learn-on-the-job vibe for me. Any time a new problem arose, I would research best practices to tackle them, and implement where possible. A straight-forward example was the question of "how do I pull Spotify's resources into my application as easily as possible?". The solution was integrating React Query (RQ) to handle resource fetching, with its simple API and built-in data caching being the primary benefits.

It became apparent to the that the sections of the applications that I worked on towards completion were - in my mind - much more elegant than those worked on at the start. A good sign of a positive learning experience at least!

### Client Session

This was the first major problem I faced. Once the backend was built out as per the requirements of the BFF pattern, I needed to integrate some fetches on page load that would automatically check for an active session, and render the "logged in" state of the application if found. The main requirement was that no "logged out" state should be flashed to the user on page load, before the session GET request is resolved.

I opted for an authentication context provider wrapped around the application, that would present a "loading" state from RQ's useQuery hook whilst a GET request was made to the /session endpoint. if an active session was found, the server would return the authenticated user's Spotify account information. It worked well for a while, but once the applications complexity grew, it no longer fulfilled its requirements.

The arising problem was accessing the user's information outside of the auth context, such as in helper functions or state stores that are not held within the React DOM tree. Using RQ alongside a context provider obviously does not allow for this.

A solution would be to entirely refactor the application auth by replacing it with a state management store that contains all of the necessary auth actions (login, logout, check session), as well as providing global access to the user's information once retrieved.

### Client State

Once I started implementing page components for different application contexts (playlists, albums, artists), combining my backend with RQ was a breeze. However, after desinging the UI that renders the fetched data, I faced the problem of integrating user interactions. An example would be your playlist actions - if the playlist is owned by the authenticated user (or is listed as a collaborative playlist), the user should be able to edit playlist details, delete the playlist entirely, add and remove songs, and so on. The user should also be able to play the playlist as a context (Spotify's way of playing all songs associated with a particular resource, like a playlist or an album), or save/remove the playlist to/from their library.

This is where I realised how beneficial a global state management system like Redux or Zustand are. The problem I faced is that I would need to access the currently rendered context's information, such as context type (playlist, album, artist), context id, etc, to then be able to perform actions associated to that context.

I had elected to use Zustand for my global client-side application state for a couple hooks already, and so looked to integrate RQ with Zustand to be able to access information about the currently rendered content, but couldn't seem to figure out a clean solution. After all, RQ is meant to handle server-side state and Zustand is meant to handle client-side state - they should be separate.

Numerous components used throughout the application are dumb. They render any information provided to them, but depending on the current context, different actions should be made rendered to (or hidden from!) the user. You wouldn't want to render a "remove track from this playlist" button for a track, when you're currently on the album page.

In hindsight, a solution to this may have been to create simple zustand stores for handling each context, and each store would simply store the context's id. That way, the currently rendered context id can be easily fetched from state, and used to pull the cached data for that context from RQ, without having to prop drill into oblivion.

Later on in the project I did integrate a fully functional Zustand store for handling the Spotify player state and actions, and it worked really well, but that's because data caching was not a requirement here. At this time of writing this, I'm still not sure on the best practices for integrating server-side data caching alongside a state management library. Maybe Redux Toolkit was the answer for me?

### Infinite Scroll

A common problem for large-scale web applications I found! Any popular web or mobile application probably uses some form if infinite scrolling system these days. Social media and their infinite loading content, YouTube video recommendations, Spotify playlists...

I did look through infinite scroll solutions, as I started to face some lagging when rendering larger track lists on the page. I could not settle on an out-of-the-box library that provided me with all of the functionality I needed, and on more than one occasion the scrolling felt terrible (imagine your frame rate dropping from 144fps to a capped 30fps).

I made the decision to cap any context to 250 tracks, as Spotify's limit per page fetched is 50 items. It would take an awful lot of requests to fetch a Playlist consisting of 1,000+ tracks.

A far better solution would be integrating a custom infinite scroll hook alongside the Token-Mediating Backend architecture discussed prior, allowing for good application performance by rendering additional pages as needed, and only rendering a handful of elements on the DOM at one time (enough to fill the viewport, with some buffer), whilst also allowing for user click interactions and fluid/smooth scrolling behaviour.

### Unprotected Resources

After completing the majority of the project, I came to the stark realisation that one of the [authorisation flows](https://developer.spotify.com/documentation/web-api/concepts/authorization) supported by Spotify allows you to access unprotected resources by authenticating the app rather than the user. Think of the "logged out" Spotify website - you can still access a tonne of resources such as artist pages and albums, but your access is limited. You cannot play any music for example.

Knowing this now, it would be cool to integrate 2 methods of authentication so that the client can still function as a browsing tool when there is no authenticated user.

## Finishing Up

This project was a blast to work on. I learned an awful lot and put myself through the paces. It felt like doing another final year University project, except without the stress!

In summary, absolutely ecstatic with how the "finished" product turned out. An awful lot of time was spent nit picking at the Spotify UI, and I gave it a really good shot at replicating some of their best features. A couple favourite bits of mine:

-   The simple library design with accordion sub-menus. Far better than what Spotify has come up with these days in my opinion!
-   Header opacity on scroll effect, with custom colours. Unfortunately Spotify do not provide access to the "primary_colour" key within a contexts property that they use internally to customise the background colour of the UI as you navigate through pages. My solution was a simple random colour picker. Still looks great!
-   /search page and nested routing. This was one of the last features I worked on. I think it works really elegantly, although my React component writing could probably still do with some work.

Funnily enough, at the time of writing this README, Spotify has released a redesign for some of their UI, having gotten rid of the navigation container and replacing it with a navigation bar across the top of the page. Maybe I'll update this in the future.

## References

1. [The Copenhagen Book](https://thecopenhagenbook.com/) by pilcrow
2. [OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps) by Aaron Parecki, David Waite, Philippe De Ryck
