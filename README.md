# Playwright — Create Transport Request

Small Playwright Test project that automates the "Create Transport Request" flow.

## Setup

- Use `make install` to install testing enviroment
    - If you are missing make, you can make installation with `npm install`, `npx playwright install` and later test using only `npx playwright` with its arguments 
- Fill variable values in `.env` (or set env variables directly)
   
## Usage: 
- After install you can use `make test [NAME]` (headless testing) or make `make debug [NAME]` (headed testing), where NAME is optional argument, which selects tests where test name contains NAME text
- Use `make report` to view test report, `make trace` to view trace log and `make list` to view available tests
