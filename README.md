# Portfolio

[![Playwright Tests](https://github.com/merenkira/QA-Portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/merenkira/QA-Portfolio/actions/workflows/playwright.yml)

Welcome to my QA Engineer Portfolio repository! This space highlights my experience in software quality assurance, showcasing test cases, bug reports, and API testing collections to demonstrate my skills in manual and automated testing.

### About Me

I'm **Kira Merenkova**, a QA Automation Engineer based in New York with 3.5+ years of experience testing production web applications across manual, API, database, and automated layers.

I specialize in end-to-end test automation with Playwright and JavaScript, REST API testing, SQL validation, CI/CD integration, and debugging across UI, API, and backend systems. My background spans e-commerce (payments, subscriptions, recurring orders, refunds) and EdTech (AI assessments, scheduling, 1:1 learning).

I'm currently studying AI testing evaluation methodologies: accuracy and performance evaluation, LLM-as-a-judge/rubric-based scoring, and prompt evaluation, alongside security testing.

### Resume

You can download my resume [here](https://drive.google.com/file/d/1CPWw42WUfcxf1zYB5Q4QE8zG9vAuRv2h/view?usp=sharing)

### Skills

- Manual and Automated Testing: functional, regression, smoke, exploratory, negative, and edge-case testing; automation with Playwright and JavaScript
- API Testing: testing RESTful APIs using Postman, ensuring that the system backend operates correctly and meets business requirements
- SQL & Database Validation: backend and data-consistency validation using SQL and MongoDB
- Cross-Functional Collaboration: working closely with developers and product teams to ensure software meets both functional and user-experience standards

### Examples of My Work

- Manual Test Cases: [View examples](./manual_examples)
- Automated Test Scripts: [View examples](./pet-project/)
- Bug Reports: [View examples](./bug_reports)
- Postman Collection: [View examples](./api/postman) - Import the `.json` files directly into your Postman app to see how I handle API testing

## Pet Project: Playwright Automation

End-to-end UI and API tests written with Playwright and JavaScript, located in [`pet-project/`](./pet-project). This is a portfolio project built for one specific web application (a real-estate platform), so the tests only work against that application's dev environment. It demonstrates the framework structure: Page Object Model, API helpers, test data, and CI.

### Prerequisites
- Node.js (LTS version)
- npm

### Setup
```bash
git clone https://github.com/merenkira/QA-Portfolio.git
cd QA-Portfolio
npm install
npx playwright install
```

### Configuration
The tests read the application URL and test account credentials from environment variables, so no secrets are stored in this repository.

1. Copy the template: `cp .env.example .env`
2. Fill in your own values in `.env`

| Variable | Description |
|---|---|
| `BASE_URL` | URL of the application under test |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin account credentials |
| `ADMIN_ROLE`, `ADMIN_NAME`, `ADMIN_SURNAME`, `ADMIN_FULLNAME` | Admin profile data used in assertions |
| `USER_EMAIL`, `USER_PASSWORD` | Regular user account credentials |
| `USER_ROLE`, `USER_NAME`, `USER_SURNAME`, `USER_FULLNAME` | Regular user profile data used in assertions |

`.env` is git-ignored. The tests are tied to the structure of one specific application, so they can't be pointed at a different `BASE_URL`. The dev environment URL and test account credentials are not published in this repo; they're available on request (see contact details below).

### Running the tests
```bash
npm test               # run all tests headless
npm run test:headed    # run with a visible browser
npm run test:ui        # Playwright UI mode
npm run report         # open the last HTML report
```

To run a single file: `npx playwright test pet-project/tests/<file>.spec.js`

### CI
Tests run on GitHub Actions on every pull request to `main` and can be triggered manually. Credentials are stored as repository secrets. See the [latest runs](https://github.com/merenkira/QA-Portfolio/actions).

### Project structure
```
pet-project/
├── api/            # API helpers (listing, realtor, user)
├── page_objects/   # Page Object Model classes
├── test_data/      # Test data
└── tests/          # Spec files
```

### Tools

**Automation:** Playwright, JavaScript  
**API Testing:** Postman, Swagger, RESTful services  
**Bug Tracking:** Jira  
**Test Case Management:** Zephyr Scale, Qase.io  
**Version Control:** Git, GitHub  
**Databases:** SQL, MySQL, PostgreSQL, MongoDB  
**CI/CD Integration:** GitHub Actions  
**AI-Assisted QA:** Cursor AI, MCP, Playwright Agents  
**Collaboration:** Agile/Scrum methodologies

### Connect with Me

Feel free to reach out if you have any questions about my work or would like to collaborate on QA projects!

**LinkedIn** <https://linkedin.com/in/merenkira> **Email** <meren.kira98@gmail.com>