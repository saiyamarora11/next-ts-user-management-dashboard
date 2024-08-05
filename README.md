# User Management Dashboard

This dashboard includes the following key features and components:

1. Dashboard Page:

A dedicated /dashboard page serves as the central hub for all user management activities.
Navigation Panel:

A right-side navigation panel with a single tab labeled "Users" provides easy access to user management functionalities.

2. User List:

The "Users" tab displays a list of users with fields such as first name, last name, email, alternate email, hashed password, and age (18+).

3. CRUD Operations:

Supports full CRUD operations:
Add User: Add new users.
Edit User: Update existing user details.
Delete User: Remove users from the list.
Data Handling:

Utilizes Next.js 14 server actions and JSON for efficient backend data management.

4. Data Display:

Uses Tanstack Table to present user data with features including:
Search: Find specific users.
Filter by Age: Filter users by age.
Pagination: Navigate through multiple pages of user data.
Multi-Select: Select and delete multiple users simultaneously.

5. Real-time Updates:

Employs Tanstack Query to ensure that any additions, edits, or deletions are automatically updated without refreshing the page, ensuring a responsive and efficient user management experience.

## Vercel Link

https://next-ts-user-management-dashboard.vercel.app/dashboard/users

## Screenshots

<img width="1440" alt="Screenshot 2024-08-05 at 1 25 24 PM" src="https://github.com/user-attachments/assets/90ac092b-c3fd-4e06-a4f0-b9c14d5261e0">

<img width="721" alt="Screenshot 2024-08-05 at 1 25 35 PM" src="https://github.com/user-attachments/assets/31fae64e-bc6b-4150-a213-6c0955c0f641">

<img width="645" alt="Screenshot 2024-08-05 at 1 25 40 PM" src="https://github.com/user-attachments/assets/441ecb26-4cfd-48be-8eb7-c31069cce143">

<img width="1143" alt="Screenshot 2024-08-05 at 1 25 50 PM" src="https://github.com/user-attachments/assets/f198015b-7f78-4abd-af04-a862b485fa01">

<img width="1144" alt="Screenshot 2024-08-05 at 1 25 56 PM" src="https://github.com/user-attachments/assets/eafbc78c-652b-4198-8e1e-a5ceed1f6506">

<img width="1129" alt="Screenshot 2024-08-05 at 1 26 06 PM" src="https://github.com/user-attachments/assets/d3ee2409-5906-4105-950e-6b5dd7f28a4a">

<img width="1158" alt="Screenshot 2024-08-05 at 1 26 20 PM" src="https://github.com/user-attachments/assets/d6cd04be-6bc3-46cc-a772-ad4024fa9097">

<img width="1137" alt="Screenshot 2024-08-05 at 1 26 39 PM" src="https://github.com/user-attachments/assets/d69cf530-074f-4a05-ab3b-30491c02bac0">

<img width="1184" alt="Screenshot 2024-08-05 at 1 26 48 PM" src="https://github.com/user-attachments/assets/a8cc6832-2002-40ae-a1c7-491477cbf23f">

<img width="633" alt="Screenshot 2024-08-05 at 1 26 51 PM" src="https://github.com/user-attachments/assets/4fcf1b41-8597-42b6-a267-91dc6e3df6fc">

<img width="1156" alt="Screenshot 2024-08-05 at 1 26 58 PM" src="https://github.com/user-attachments/assets/71bd0046-4f84-4536-b1d6-a1d560780bcc">

<img width="1145" alt="Screenshot 2024-08-05 at 1 27 10 PM" src="https://github.com/user-attachments/assets/7a9194d3-5cc7-44c8-a5db-56d0407f8c3a">

<img width="335" alt="Screenshot 2024-08-05 at 1 27 33 PM" src="https://github.com/user-attachments/assets/f50647d3-d97d-421f-be8c-9ae333f38353">

<img width="335" alt="Screenshot 2024-08-05 at 1 27 38 PM" src="https://github.com/user-attachments/assets/8e4271ac-ea3b-4cc3-aadd-8c66320cd836">


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
