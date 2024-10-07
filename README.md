# SQL Generator Project

This project is a **SQL Generator** built using **TypeScript**, **Node.js**, and the **OpenAI** npm library. It generates SQL queries based on natural language prompts, leveraging the power of OpenAI's language models to interpret user input and transform it into SQL code.

## Features

- Generate SQL queries from plain English prompts
- Supports basic SQL commands (SELECT, INSERT, UPDATE, DELETE)
- Handles JOINs, WHERE clauses, and more complex SQL syntax
- User-friendly command-line interface (CLI)

## Tech Stack

- **TypeScript**: For type safety and enhanced development experience.
- **Node.js**: Backend runtime for handling operations and running the CLI.
- **OpenAI npm library**: Interacts with OpenAI models to generate SQL queries from natural language.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- OpenAI API Key (sign up at [OpenAI](https://beta.openai.com/signup))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sql-generator-openai.git
   cd sql-generator-openai
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up your OpenAI API key by creating a `.env` file with the following:

   ```bash
   export OPENAI_API_KEY=<your-api-key>
   ```

### Running the CLI

1. Run the SQL Generator:

   ```bash
   npm start
   ```

2. Enter a prompt, such as:

   ```bash
  Generate a SQL query that selects all customers from the customers table where the age is greater than 30.
   ```

3. The CLI will output the corresponding SQL query:

   ```bash
   SELECT * FROM customers WHERE age > 30;
   ```

