# BigMood
Big Mood is a Node.js web app that takes in a photo of the user's face, determines their mood with the Microsoft Emotion API and then generates a Spotify playlist based on questions that corresponds to their mood.
​
## Audience
The primary audience would be Spotify users looking for new music.
​
## Experience
A user opens the web app when they want some new tunes, and they upload their photo or select their mood from a dropdown. A random Spotify playlist that matches their mood loads on the page, which they can listen to on the page or in the Spotify app.
​
# Technical
## Models
-User input from photos (.jpg, .png) or selections from drop-down list
-Output of what emotion is detected from API
-Pre-picked arrays of playlists, one array for each mood
​
## Views
-Index.hbs (landing page) - options to submit photo or select from dropdown
-Playlist.hbs - pages for each mood, each with custom view

​
## Routes
[What routes will we need? What will they do?]
bigmood.com/index
  options on dropdown: route.get requests to playlist
  submit photo, send to API, route back to render playlist output page
bigmood.com/playlist/{{emotion}}
​
## Other
Microsoft Emotion API
​
# Daily Milestones
## Monday - Create Concept Ideas / Map
- task 1: Mock-ups/wireframes
- task 2: Research API
- task 3: Start a github repo
## Tuesday - Begin Build
- task 1: Usable web page (drop down lists for users to choose)
- task 2: Finish implementing embedded playlists
​
## Wednesday - Usable Build
[List of tasks to complete the implementation of features]
- task 1: Get user feedback
- task 2: Implement Microsoft Emotion API
​
## Thursday - Feature Complete
[List of tasks needed to polish and launch on a live server]
- task 1: Work out user testing bugs/ flow bugs
- task 2: Finish API
​
## Friday - Polish!
- task 1: Add CSS
