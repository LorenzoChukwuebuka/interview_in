# interview_in



This project consists of a frontend and a backend, each with its own dependencies. The following instructions will guide you through the process of setting up and running the application.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (includes npm)
- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/) (Optional, if you want to use the provided Makefile)

## Getting Started

### 1. Clone the Repository And install

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
make install
make run
```
The make install is to install the dependencies for both front and backend if you don't have make

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Start the frontend server
cd frontend
npm run dev &

# Start the backend server
cd ../backend
npm run dev &

```



