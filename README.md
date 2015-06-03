# FAMOUS WORKOUTS!

# http://www.famousworkouts.com

Famous Workouts is a collection of full-body workouts inspired by stacked movie stars and other celebrities.

I put it together over a weekend or so because I couldn't think of routines to do at the gym.

# installation

# installation

    npm install

... Then direct your web server at the `./site` directory and get pumped!

Note: You might want to remove/modify the Google Analytics code at the bottom of `index.html`.

# releasing
In `Gruntfile.js` edit the `s3:{}` task to specify your AWS bucket region & name. You can also hardcode key and secret here but be careful with public repos.

Then, run this in your CLI:

    key=XXXXXX secret=XXXXXX npm run deploy

You can also make a `.env` file and store the variables in there. The file is ignored by git, so you don't have to fear pushing up keys.
