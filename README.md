This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the application, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the application using `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Casino Duty Scheduler

This application generates a duty schedule for casino table presenters based on a selected date. It ensures that all tables are attended at all times during all shifts.

## Technologies Used

- Next.js 13
- TanStack React Query
- Tailwind CSS
- NextAuth.js with Google provider
- Prisma for database management
- Hosted on Railway

## Getting Started

To run the application, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the application using `npm run dev`.

## Environment Variables

You need to add the following environment variables to your `.env` file:
DATABASE_URL=your_database_url

And to your `.env.local` file:

--GOOGLE_CLIENT_ID=your_google_client_id
--GOOGLE_CLIENT_SECRET=your_google_client_secret
--AUTH_SECRET=your_auth_secret

## Dashboard Access

Access to the dashboard is granted for specific users to perform CRUD operations.
