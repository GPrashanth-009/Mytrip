# Contributing to TripMate 🧳

Thank you for your interest in contributing to TripMate! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the [GitLab issue tracker](https://code.swecha.org/Prashanth009/group_project/-/issues)
- Include detailed steps to reproduce the bug
- Provide system information and error logs
- Use the bug report template

### Suggesting Features
- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Include mockups or examples if applicable

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Merge Request

## 🛠️ Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (optional)
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Environment Configuration
1. Copy `env.example` to `.env`
2. Update API keys and configuration values
3. Ensure database and Redis connections are configured

## 📝 Code Style

### Python (Backend)
- Follow PEP 8 style guidelines
- Use Black for code formatting (line length: 88)
- Use isort for import sorting
- Use Ruff for linting
- Add type hints where possible
- Write docstrings for functions and classes

### TypeScript/React (Frontend)
- Use Prettier for code formatting
- Follow ESLint rules
- Use functional components with hooks
- Implement proper error handling
- Add PropTypes or TypeScript interfaces

### Git Commit Messages
- Use conventional commit format
- Keep messages concise and descriptive
- Reference issue numbers when applicable

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Code Coverage
- Maintain test coverage above 80%
- Write tests for new features
- Update tests when fixing bugs

## 📚 Documentation

- Update README.md for new features
- Add docstrings to Python functions
- Include JSDoc comments for TypeScript functions
- Update API documentation when endpoints change

## 🔒 Security

- Never commit API keys or sensitive data
- Follow security best practices
- Report security vulnerabilities privately
- Validate all user inputs
- Use HTTPS in production

## 🚀 Release Process

1. Update version numbers
2. Update CHANGELOG.md
3. Create a release tag
4. Deploy to staging environment
5. Run integration tests
6. Deploy to production

## 📞 Getting Help

- Join our [Discord server](https://discord.gg/tripmate)
- Check existing issues and discussions
- Ask questions in the community forum

## 📋 Issue Templates

We use issue templates to ensure all necessary information is provided:
- Bug reports
- Feature requests
- Documentation improvements
- Performance issues

## 🔄 Pull Request Process

1. **Code Review**: All code must be reviewed by maintainers
2. **CI/CD**: All tests must pass in the CI pipeline
3. **Documentation**: Update relevant documentation
4. **Squash Commits**: Clean up commit history before merging

## 🎯 Contribution Areas

### High Priority
- Bug fixes
- Security improvements
- Performance optimizations
- Documentation updates

### Medium Priority
- New features
- UI/UX improvements
- Test coverage improvements
- Code refactoring

### Low Priority
- Cosmetic changes
- Minor optimizations
- Additional examples

## 📊 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame
- Community acknowledgments

## 📜 License

By contributing to TripMate, you agree that your contributions will be licensed under the AGPLv3 license.

---

Thank you for contributing to TripMate! 🎉

For any questions about contributing, please open an issue or contact the maintainers.
