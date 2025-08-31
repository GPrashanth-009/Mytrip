# TripMate - AI-Powered Travel Assistant

TripMate is an intelligent AI chatbot that helps users plan trips by suggesting travel routes, places to visit, budget-friendly itineraries, and hidden gems.

## Features

- **Smart Route Planning**: Suggests optimal travel routes (road, train, flight, bus)
- **Destination Discovery**: Recommends best places to visit near location or chosen destination
- **Budget Management**: Creates cost-effective itineraries with cheap stays and local food options
- **Personalized Planning**: Generates day-by-day trip plans based on time, distance, and budget
- **Hidden Gems**: Suggests unique activities and off-the-beaten-path experiences
- **Interactive Chat**: Conversational AI interface for natural trip planning

## Project Structure

```
MyTrip/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Configuration and core logic
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic and AI services
│   │   └── utils/          # Utility functions
│   ├── requirements.txt    # Python dependencies
│   └── main.py            # FastAPI application entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service calls
│   │   └── styles/         # CSS styles
│   ├── package.json        # Node.js dependencies
│   └── public/             # Static assets
├── docker-compose.yml      # Docker configuration
└── README.md              # This file
```

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Using Docker
```bash
docker-compose up --build
```

## API Endpoints

- `POST /api/chat` - Main chat endpoint for trip planning
- `GET /api/destinations` - Get destination suggestions
- `POST /api/plan` - Generate trip itinerary
- `GET /api/routes` - Get travel route options

## Technologies Used

- **Backend**: Python, FastAPI, SQLAlchemy, OpenAI API
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: SQLite (development), PostgreSQL (production)
- **AI**: OpenAI GPT models for intelligent responses
- **Deployment**: Docker, Docker Compose

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
