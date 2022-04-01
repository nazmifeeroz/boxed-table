# Frontend React Table Test

> Create a reusable table component in React.

## Expectations
- [x] Table should have 4 or more columns.
- [x] Table data state
    - Asynchronously fetching data can be faked (setTimeout, Promise, …)
    - Display in-flight state while fetching data
    - The data isn’t important, it can be anything you like.
- [x] Table should have pagination (ex. 100 records, 25 records per page)
    - Next / Previous buttons
    - Show current page number
- [x] Table should have filtering
    - At least one column should be sortable
    - Add a search bar above table to filter by one data property
- [x] Table rows should be selectable
    - Create a checkbox for each row
    - Display selected rows as JSON below Table component
- [x] No class components. Use hooks.

## Bonus (_Not Required_):
- [x] Manage table states via url query params
    - Initialize Table state via url query params
    - Continue managing Table state via url query params
- [x] Testing (ie. testing-library)

## Tech stack

- Bootstrapped Create React App with Typescript

## Installation and Usage

Project uses `yarn` to install and run app.

To run the app on the local development, you will need to install all dependencies:

```sh
yarn install
```

Starting the app:

```sh
yarn start
```

Running the tests:

```sh
yarn test
```
