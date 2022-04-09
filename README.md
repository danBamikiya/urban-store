# urban-store

An e-commerce project built with React, TypeScript, Redux, Firebase.

## Frontend

The UI was implemented with React and Typescript with little focus on styling and more focus on the store's implementation. The UI's state is implemented and handled with Redux state manager and the UI's actions are handled with Redux Saga.
These actions handles interactions with the Firebase database and Stripe Payment API.

## Backend

The minimal backend is implemented in NodeJS and TypeScript to handle the Stripe Payment API and deployed as a Firebase Function.

## Development

The development of this app done in a Docker container and the Docker Compose commands were managed with Shell and PowerShell scripts.

## Deployment

The API handling payments request is deployed as a Firebase Function and the React UI is deployed on Firebase hosting: https://urban-stores.web.app/

## Requirements to run the app

- A Firebase Database configuration (requires creating a Blaze Google Cloud account)
- A Stripe Developer's Private Key and Publishable Dev Key (requires creating an account with them)
