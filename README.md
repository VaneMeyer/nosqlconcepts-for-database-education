# NoSQLconcepts for database education - Work in Progress
Note, that this instance of the tool (only SQL exercises) is used in the german "Database Programming" Course at Goethe University Frankfurt. 
You can also check out our english tool (SQL, CQL, Cypher and MQL exercises) used in the "DBMS" practical course at https://github.com/VaneMeyer/nosqlconcepts 

## Installation and usage

# Installation requirements

- Docker
- Git
- Ollama

# Clone repository

Clone the Repository by using the command: `git clone https://github.com/VaneMeyer/nosqlconcepts-for-database-education.git`

# Build the containers

Inside the project directory, build the ensemble of containers: `docker compose build`

# Start the environment

Start the app using the following command within the project directory: `docker compose up -d`

# Tool Screenshots 

## Admin Dashboard
<img width="1896" height="779" alt="adminDashboard_newTheme" src="https://github.com/user-attachments/assets/734de8e3-2e6e-4216-b95a-a6901c810439" />

## Example Task
<img width="1146" height="580" alt="exampleTask" src="https://github.com/user-attachments/assets/a0124955-7300-4e46-9e0f-19d68ceb9aaa" />

## Example Feedback
<img width="686" height="783" alt="exampleFeedback" src="https://github.com/user-attachments/assets/e38718d9-d75a-4bea-9d5e-c19714adb072" />

### Prompt for LLM-based learning tips
The following prompt is used to generate the LLM-based learning tips shown above.
```
You are a helpful tutor.
Provide clear, constructive feedback that helps the student understand their mistake and
how to improve their answer, based on the following information:
Exercise question data: "${questionData}"
Correct sample answer: "${correctAnswer}"
Student's answer: "${studentAnswer}"
      

The students have to find the correct query themselves, so do provide only a hint in
your output without a solution query. Also limit your output to 1 or 2 sentences.

Format it strictly following the exact structure, with no additional text, special characters,
Markdown, Brackets or deviations and be precise about which table etc is needed in order
to understand their mistake and how to improve their answer:
      "(1) Lerntipp: [learning tip text]", and ensure the actual learning tip appears only after "Lerntipp:".
If more than one learning tip is really necessary, separate them with "\n" and
increase the number in ( ) with 1, exactly as the following structure:
      "(1) Lerntipp: [learning tip text]\n(2) Lerntipp: [learning tip text]".

Ensure the learning tip(s) are for German speakers, clear, educational,
and supportive, but do not stretch them unnaturally.
```

## AI Tutor component for LLM Comparison
<img width="1094" height="759" alt="aiTutorComponent" src="https://github.com/user-attachments/assets/de459d08-dc5e-417b-9e81-e5b2293f5575" />
<img width="1067" height="720" alt="aiTutorLLMsFeedback" src="https://github.com/user-attachments/assets/980d91cb-d7d9-4b12-8de6-96608bbd4c0e" />


