# Liri-node-app

This bot is able to take in commands from three seperate API's and then output the result in the console. This provides the user
with a tool to search for their favorite song/band/movie and recieve information on that topic.

# Instructions

Make sure to install the following node packages before attempting to use the Liri bot:

#### 1. Dotenv:

Loads variables from the .env file to the process.env. Use 'npm install dotenv'

#### 2. Moment:

Makes http calls and follows redirects. Use 'npm isntall request'

#### 3. Axios:

Makes http requests from node, supports Promise API. Use 'npm install axios'

After installing the necessary packages open Gitbash, terminal, console and enter any of the commands found in the below section.

Please note you will need an API key to run Spotify as well as movies.

# Commands

### 1. Concerts

  Command: concert-this (Artist Name)
  
  Provides the user with the artist's next show information. Includes: date, time, and location.
  
  ![image of concert](/assets/images/concert.png)
  
  ### 2. Spotify
  
  Command: spotify-this-song (Song Name)
  
  Allows the user to search a song in the Spotify database and returns with information. Includes: artist, song name, album, and link.
  
  ![image of spot-song](/assets/images/spot-song.png)
  
  ### 3. Movies
  
  Command: movie-this (Movie Title)
  
  The user may search for a movie title which then returns information on the movie.
  Includes: title, cast, release, ratings, country language and plot.
  
  ![image of movies](/assets/images/movies.png)
  
  ### 4. Random
  
  Command: do-what-it-says
  
  This command will pick between concerts, spotify, or movies at random and run that command.
  
  ![image of random](/assets/images/dowhat.png)

If the user does not enter a command or the command is not recognized the program will suggest the proper list of commands.

![image of error](/assets/images/error.png)

# Credits

This bot was created by me with help and input from others for a class project. The API's used: Bands in Town Artist Events API
Spotify's API as well as the OMDB API. Axios is used to retrieve data from the OMDB API.
