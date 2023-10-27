# FarAI

FarAI is an AI-driven personal development coach that leverages personality assessments to generate custom-tailored recommendations, derived from user prompts, designed to enhance personal development in the workplace. This coach is adept at comprehending your distinct personality, career aspirations, and workplace hurdles, offering personalised guidance and a wealth of resources to foster career advancement and overall well-being.

## API Keys
You will need two separate API keys for the application to work:<br>
**OpenAI API key**<br>
To obtain an API key to talk to FarAI, sign up on the OpenAI website follow the instructions to obtain an API key at [OpenAI](https://platform.openai.com/).

**Personality Quest API key**<br>
To obtain an API key for the personality quiz, sign up for a Rapid API account and subscribe to a plan provided by Personality Quest API at [RapidAPI](https://rapidapi.com/dotcoder21/api/personality-quest).

## Setup Instructions

### Back-End
1. Install IntelliJ or another suitable IDE for JDK 17.
2. Install PostgreSQL. If using the command line on MacOS and have homebrew installed use `brew install postgresql`.
3. Clone the repository from GitHub. If using the command line `git clone {HTTP/SSH URL}`
4. Open the `server` directory in your IDE.
5. Create a new `.env` file in `src/main/java/resources` directory and add the API keys in the format below. Make sure the API keys are a String. See `.env.example` as an example.
```
openai.api_key="OPENAPI KEY"
personality_quest.api_key="Personality Quest API KEY"
```
7. Create a database with this command `createdb peregrine_db`. See the `application.properties` file for the path that the application requires to access the database
9. Run the application from the `ServerApplication` file.
10. The server will run on the default port `8080` unless you have configured java applications to run on a different port.

### Front-End
1. Install VSCode of another suitable IDE.
2. Install node.
3. Open `front-end-client` in VSCode or navigate to that directory in command line.
4. Run `npm install` to install the neccessary node_modules.
5. Within your IDE or command line run `npm run dev` to start the front-end-client.
6. This will run on port `5173`. If not running on that port return to the command line and Vite will tell you what port the client is running on.
7. In your browser go to [http://localhost:5173/LoginPage](http://localhost:5173/LoginPage) and create a new user and follow the account setup instructions.
8. To skip the new user creation features use the example user login details: <br>
   email: John@gmail password: password123
