# Simple Color Picker

## Stack
- **Frontend:** Next.js
- **Backend:** Node.js + Express
- **Database:** Supabase
- **CSS:** Tailwind CSS

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd simple-color-picker
    
2.  **Install root dependencies:**
    This project uses a monorepo structure. Run `npm install` from the root to install dependencies for all workspaces.
    ```bash
    npm install
    
3.  **Configure environment variables:**
    Create a `.env` file in the root directory and populate it based on the `.env.example` file.

4.  **Run the application:**

    ### Frontend
    Navigate into the `frontend` directory and start the Next.js development server:
    ```bash
    cd frontend
    npm run dev
    
    The frontend will typically be available at `http://localhost:3000`.

    ### Backend
    Navigate into the `backend` directory and start the Node.js Express server:
    ```bash
    cd backend
    npm run dev # Or npm start, depending on backend script
    
    The backend will typically run on `http://localhost:5000` (or the port configured in `.env`).

## Project Structure
- `frontend/`: Contains the Next.js application.
- `backend/`: Contains the Node.js + Express API.