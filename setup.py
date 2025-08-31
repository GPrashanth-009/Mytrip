#!/usr/bin/env python3
"""
TripMate Setup Script
This script helps you set up the TripMate AI Travel Assistant application.
"""

import os
import sys
import subprocess
import platform

def print_banner():
    """Print the TripMate banner."""
    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║                    🧳 TripMate Setup 🧳                     ║
    ║              AI-Powered Travel Assistant                     ║
    ╚══════════════════════════════════════════════════════════════╝
    """)

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")

def check_docker():
    """Check if Docker is installed and running."""
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Docker detected")
            return True
        else:
            print("❌ Docker not found")
            return False
    except FileNotFoundError:
        print("❌ Docker not found")
        return False

def check_node():
    """Check if Node.js is installed."""
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Node.js detected")
            return True
        else:
            print("❌ Node.js not found")
            return False
    except FileNotFoundError:
        print("❌ Node.js not found")
        return False

def create_env_file():
    """Create .env file from template."""
    if not os.path.exists('.env'):
        if os.path.exists('env.example'):
            print("📝 Creating .env file from template...")
            with open('env.example', 'r') as template:
                content = template.read()
            with open('.env', 'w') as env_file:
                env_file.write(content)
            print("✅ .env file created")
            print("⚠️  Please update .env file with your API keys!")
        else:
            print("❌ env.example not found")
    else:
        print("✅ .env file already exists")

def setup_backend():
    """Set up the Python backend."""
    print("\n🐍 Setting up Python backend...")
    
    if not os.path.exists('backend'):
        print("❌ Backend directory not found")
        return False
    
    os.chdir('backend')
    
    # Create virtual environment
    if not os.path.exists('venv'):
        print("📦 Creating virtual environment...")
        subprocess.run([sys.executable, '-m', 'venv', 'venv'])
    
    # Activate virtual environment and install dependencies
    if platform.system() == "Windows":
        activate_script = "venv\\Scripts\\activate"
        pip_path = "venv\\Scripts\\pip"
    else:
        activate_script = "venv/bin/activate"
        pip_path = "venv/bin/pip"
    
    print("📦 Installing Python dependencies...")
    subprocess.run([pip_path, 'install', '-r', 'requirements.txt'])
    
    os.chdir('..')
    print("✅ Backend setup complete")
    return True

def setup_frontend():
    """Set up the React frontend."""
    print("\n⚛️  Setting up React frontend...")
    
    if not os.path.exists('frontend'):
        print("❌ Frontend directory not found")
        return False
    
    os.chdir('frontend')
    
    print("📦 Installing Node.js dependencies...")
    subprocess.run(['npm', 'install'])
    
    os.chdir('..')
    print("✅ Frontend setup complete")
    return True

def print_next_steps():
    """Print next steps for the user."""
    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║                    🎉 Setup Complete! 🎉                     ║
    ╚══════════════════════════════════════════════════════════════╝
    
    📋 Next Steps:
    
    1. Update your .env file with your OpenAI API key:
       OPENAI_API_KEY=your_actual_api_key_here
    
    2. Start the backend:
       cd backend
       source venv/bin/activate  # On Windows: venv\\Scripts\\activate
       uvicorn main:app --reload
    
    3. Start the frontend (in a new terminal):
       cd frontend
       npm start
    
    4. Or use Docker (recommended):
       docker-compose up --build
    
    🌐 Your application will be available at:
       Frontend: http://localhost:3000
       Backend API: http://localhost:8000
       API Docs: http://localhost:8000/docs
    
    📚 For more information, check the README.md file
    
    Happy Traveling! ✈️
    """)

def main():
    """Main setup function."""
    print_banner()
    
    print("🔍 Checking system requirements...")
    check_python_version()
    docker_available = check_docker()
    node_available = check_node()
    
    print("\n📁 Creating environment file...")
    create_env_file()
    
    print("\n🚀 Setting up application...")
    
    if node_available:
        setup_frontend()
    else:
        print("⚠️  Skipping frontend setup (Node.js not available)")
    
    setup_backend()
    
    print_next_steps()

if __name__ == "__main__":
    main()
