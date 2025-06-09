## Case Overview

This is a room booking interface where users can select a time slot and input their name to confirm a reservation.

## Tech Stack

- Frontend: Next.js (Pages router), TypeScript, Tailwind CSS

- Backend: Supabase (PostgreSQL)

## Architecture & Backend Choices

This project integrates the backend logic directly within the frontend for simplicity.

## Database Structure

# Tables

- rooms: id, name, capacity

- slots: id, date, time, room_id (foreign key), booked, booked_by

## Mock Data

- Static slots for **18 okt**, **19 okt**, and **20 okt** are manually created in Supabase for simplicity.

- Dates are mock data, allowing focus on functionality.

## Setup

1- clone the repo

2- install dependencies:

```bash
npm install
```

3- Add `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4- run the app

```bash
npm run dev
```

## Features

- Room filtering with multi-select dropdown.
- Modal feedback after booking confirmation
- The app uses **React context** to store `selectedSlotId` across pages.
- Slot availability is fetched dynamically from Supabase where (`booked = false`).
- Semantic HTML is used to improve accessibility and structure
- Clean and modular component structure using TypeScript for type safety.

## UI/Styling Notes

While the core functionality and accessibility were prioritized, a few UI details were not fully implemented due to time constraints:

- The slot grid table has no full height relative to the viewport.
- The table has no rounded corners
- Checkbox styling in the room filter is currently default

## Chenges needed for production

# Enable RLS Policies

- Create a row level security policy at the database for slots table to let user only **update** rows where `booked = false` and restrict the update to `booked = false` AND `booked_by IS NOT NULL`

- Create policies for SELECT to enable read access for users for table slots and rooms.

# Move sensitive operations to a separate backend

A backend server to avoid exposing the Supabase key and bypassing RLS policies.

# avoid data lost on refresh

Store the `selectedSlotId` or booking details in localStorage or pass via query params to avoid data loss on reload.

# Use a good strategy to generate slots

When designing the system, I considered two main approaches for handling booking slots for production depending on the case:
1- Pregenerated slots (Database-driven): generate new possible slots each day in Supabase and mark them with booked = false and delete past slots.

2- Dynamic slots (Frontend-generated)
Only store booked slots, and dynamically generate availbale slot times on the frontend.

- Current choice: For this coding case, I implemented the pre-generated slot model (mocked the data), this simplifies booking logic `.eq("booked", false)` and improves clarity.

# Slot Grid rendering

To display the available slots I used a semantic HTML <table> structure. The decision was made because of the nature of the table presented that looks like a table. This structure kept the code simpler and more readable. However because many cardSlots was inside one cell in the table, for future consideration, i might use a `role="grid"` approach for larger or more interactive applications to get more control over the layout and keyboard interactions.
