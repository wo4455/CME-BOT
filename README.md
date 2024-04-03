# CME BOT

CME Bot simplifies the navigation and understanding of derivative trading on the CME Group’s website using AI technology. Powered by OpenAI's ChatGPT, it offers focused, accessible guidance for users new to financial trading on CME Group.

## Features

- **AI-Driven Interactions**: Engage with an intelligent chatbot designed to answer questions specifically about CME Group.
- **Focused Guidance**: Utilizes a set of guidelines and rules to ensure responses are relevant to CME Group queries.
- **Contextual Memory**: Implements session management to maintain the context of conversations, improving user experience.
- **Tech-Forward Design**: Built with ReactJS for the frontend and ExpressJS for the backend, ensuring a robust and user-friendly interface.

## Getting Started

### Prerequisites

- Node.js

### Installation and Usage

1. Clone the repository:
   ```
   git clone https://github.com/wo4455/CME-BOT.git
   ```

2. Navigate to the project directory
   ```
   cd CME-BOT
   ```

3. Navigate to the server and client folders simultaneously (separate terminal windows) and install dependencies on both.
   ```
   npm install
   ```

4. Inside the server folder, create a new file named '.env' and define two variables
   ```
   API_KEY=*your ChatGPT api key*
   MONGODB_URI=*connection link to database*
   ```

5. Start the backend server in /server
   ```
   npm start
   ```

6. Start the frontend server in /client
   ```
   npm run dev
   ```

7. Visit: ```http://localhost:5173/```

### Usage

Once on the site, ask any CME Group-related question, and the bot will provide an informed response based on its AI-driven understanding and the context of your query. Log in or create an account to save your past conversation!

## Authors

- **Will Otwell** - [wo4455](https://github.com/wo4455)

### License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) file for more information.
