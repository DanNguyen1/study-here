# Study Here Web App

A Next.js app built to view available rooms to study in, deployed on Vercel.

---

## Features
- Built with **Next.js**
- Deployed with Vercel at https://study-here.vercel.app/
- Pulls rooms from a NoSQL DB (MongoDB)
- Uses **useCallback** to dynamically change rooms avaliable capacity
- Updates the UI dynamically based on rooms and their information from DB
- Organized into different components for clarity
- Utilizes lucide-react search to filter out rooms by name

---

## Components
1. `RoomCard` – Displays the name, capacity, and button for each study space.
2. `page.tsx` – Main page.

---

## How it works
- Upon website load, useEffects loads the rooms into a React state
- The website will dynamically render the DB items in the state using map, mapping the JSON objects to RoomCard components
- The website calls a custom API that accesses MongoDB to fetch the rooms in the database
- useMemo is utilized to filter the room by name and filters, if applicable. Memoized so the computation doesn't have to run every render.
- The search string and filter states are maintained by a React state and checked when appropriate
---

## How AI/tutorials/starter code helped
NextJS's npx create-next-app utility was used to generate a boilerplate NextJS app and the file structure.
AI was used to generate boilerplate code for the website and to style the website using Tailwind CSS.
MongoDB docs were used to integrate MongoDB with NextJS

---

## Why React (and Next.js)?
React automatically re-renders the UI when state changes, avoiding manual DOM manipulation.
React also has utility for optimization, such as useMemo, to prevent unnecessary computation when the app re-renders
Next.js provides an intuitive way to use react out-of-the-box, providing boilerplate that can be easily modified for our own purposes
Next.js also integrates smoothly with Vercel, allowing for seamless deployment of our app to a public facing domain

---