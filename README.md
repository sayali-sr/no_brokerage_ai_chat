***NoBrokerage AI Chat Assistant***

Welcome to NoBrokerage AI Chat, your intelligent assistant for finding properties in India using natural language. Instead of manually applying filters, you can simply ask questions like “3BHK flat in Pune under ₹1.2 Cr” or “Ready-to-move 2BHK near Baner, Pune,” and the AI will fetch relevant properties along with a concise summary.

**Live Demo**
You can try the app live on Streamlit (replace the placeholder with your actual deployed link once live). The chat interface is simple and intuitive, allowing you to interact naturally with the system and explore property options quickly.

**Tech Stack**
The frontend is built using Streamlit for a clean and interactive interface. The backend uses Node.js with Express, connecting to a PostgreSQL database where all the property data is stored. The AI/NLP part is currently implemented with rule-based parsing to understand user queries, extract key filters, and retrieve relevant results. Optional enhancements can include semantic search using embeddings for smarter results.

**How It Works**
The system works in five main steps. First, you ask a property-related question in natural language. Second, the backend extracts key filters such as city, BHK, budget, possession status, locality, and project name. Third, the backend queries PostgreSQL to retrieve matching listings. Fourth, a short 2–4 line summary is generated describing the best-matched properties. Finally, the app displays property cards showing key details including project name, BHK, price, possession date, address, and a brief summary.

**Example Queries**
Some example questions you can ask include:
“3BHK ready-to-move flat in Pune under ₹1.2 Cr”
“2BHK apartments near IT Park, Baner, Pune”
“Under construction 4BHK in Mumbai”

The expected response includes a short summary like: “Within ₹1.2 Cr, most 3BHK ready homes in Pune are near Wakad and Baner. Six listings include metro access and club amenities.” Beneath the summary, property cards display project name, BHK, price, possession status, and address.

**Notes**
All data is fetched from the PostgreSQL database, so no listings are hardcoded. Ensure the backend server is running before interacting with the frontend. When deploying the frontend online, update the API URL to point to the publicly accessible backend server instead of localhost.

**Project Structure**
The project is organized into two main folders: backend contains the Node.js API and database service code, while frontend contains the Streamlit application. A data folder stores sample CSVs used for populating the database, and a .env.example file shows sample environment variables for PostgreSQL connection.

**Future Improvements**
Potential enhancements include adding semantic search using embeddings for smarter results, integrating OpenAI or Hugging Face models for more natural conversations, and implementing user authentication with personalized recommendations.

