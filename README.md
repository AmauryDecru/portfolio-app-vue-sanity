# NEWS BULLETIN APP WITH SANITY.IO, VUE.JS & TAILWIND CSS

## Project
This app serves as a news-bulletin app with a newsfeed and an info-page about the authors. It has a landing page with some info about the community for which it is made.
At the bottom is the news feed, with the button to load more posts. The hamburger top-left opens a side-menu with navigation. The app is read-only (for now) and gets its data from a Sanity-API. The models that make up this API can be found in the studio-folder. 

### Sanity.io
Sanity is a recent and innovative headless CMS that I got to know during my internship. With Sanity, you can seamlessly define a domain with relations, props and constraints using only Javascript. After compilation of these JS-models, you receive a user-friendly CMS UI configured to the models you just defined, wherin CRUD-operations can be done. This is a very efficient substitute to a handmade Admin-area within your app, making everything other get-functionality in your app redundant. For integration with your front-end, Sanity serves as a REST-API, to which get-requests can be send for data-delivery.

### Vue.js
I have tried to make use of as much of Vue-components as possible, making this app really modular. Changes are handled in the store using the Vuex state-manager.
This is perhaps the most sophisticated aspect of the app, because all changes that happen in the Sanity-backend are updated in real-time without the need for refreshing, thanks to functionality written with Vuex-tools. All other things that need to be kept track of, like navigation and number of items to load, are also managed within the store. Styling is done with Tailwind-CSS, which proved to have steep learning curve, but the possibilities are endless. Everything is fully responsive by default. 
