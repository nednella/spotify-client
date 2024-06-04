This wrapper is a refactored version of the popular Spotify API node package (https://github.com/thelinmichael/spotify-web-api-node/).

I opted to re-write the package from the ground to suit my needs (and also give me some insight into how popular packages are built and maintained, and an understanding of the builder design pattern, which I've never used before until now).

Changelog:

-   reformatted any code used into ES6 modules and Class syntax
-   Removed authorisation tokens away from the context of the wrapping class itself, instead requiring them to be provided as an argument into any instantiation of the 'ApiRequest' class, to be used with every method that results in a call to Spotify's Web API.

Reasoning:

I find the ES6 module and class syntax much more readable than the older commonJS structure, so elected to use those.

As for detachment of auth tokens from the wrapper, this was done as I wanted to build out my backend architecture in a way that operates around secure sessions, where the auth tokens (both access and refresh) would be stored on the server, directly attached to each clients' session. With each call to the server, I can then check for user authorisation via the session cookie provided in the request, and access that users' auth tokens using the provided session ID.

This method of storing tokens would potentially allow me to introduce this backend to multiple users, rather than just a locally hosted project (of which it seems the original wrapper linked above is intended for.)

Unfortunately it doesn't look like that will be possible though, and this project will remain a locally hosted application only. Reason being that Spotify developer applications (https://developer.spotify.com/dashboard) in the default 'development mode' are limited to 25 users, where each user must be manually invited to use the application via email address.

If a user is not manually approved via my Spotify application, they may well be able to log in to the client, but any request to Spotify's Web API will provide a 403 - Forbidden response, making the application redundant.

One could apply for a quota extension (such as those in a position to launch a completed application), but any application must be in agreement with Spotify's Developer Policy. One line in this developer policy strictly rules out and clones of Spotify's user experience. I would have to go down the route of creation my own 'spin-off' of the web player (an example of someone doing this can be found at https://github.com/BeardedBear/beardify).

However, I'm largely uncreative, so no.

Dependencies: axios

Axios response schema: https://axios-http.com/docs/res_schema
Axios error schema: https://axios-http.com/docs/handling_errors
