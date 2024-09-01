# Makefile

install:
	@echo "Installing dependencies for frontend..."
	cd frontend/ && npm install
	@echo "Installing dependencies for backend..."
	cd backend/ && npm install

run:
	@echo "Starting frontend..."
	cd frontend/ && npm run dev &
	@echo "Starting backend..."
	cd backend/ && npm run dev &
	@echo "Both frontend and backend are running."
