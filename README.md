This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation
Reason behind choosing create-react-app is to save the time behind project/bundler/transpiler setup.
Since i did not need many reusable variables in stylesheets and hence no CSS preprocessors like SASS/LESS

I understand that React.js might be a bit overkill for this task, however my motivation behind using React.js instead of plain JS or Library like Jquery/jquery UI are following
- Component based architechture
- Controlled data
- JSX is React.js helps prevent Injection attack, hence input sanitization becomes easier
- Usefull use cases of nice and regular Javascript concepts
- .. and of course I am interested in playing with React :)

I could have seperated more parts of functionality in the project which I did not because there was no use case(like to reuse in different parts in the project) fot that is this particular project.
local storage was used here for persitant search history.

There is room for further development and improvment since it was done like a typical POC. I am very interested to listen to your feedback :)

### Future todo
- Decide on carefull naming conventions
- Maybe more seperation of concern for better reusability
- Use of CSS preprocessor and/or test with a CSS framework
- variables for colors, media-queries and mixin etc.
- Test new React.js features in the project(there might be use cases or maybe not..)

## Instruction
- cd into the project directory
- run - npm install

### To see button go to button/ from project directory and open the button.html file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console