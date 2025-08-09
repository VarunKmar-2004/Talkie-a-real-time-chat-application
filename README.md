# Real-time Chat Application
A full-stack real-time chat application built with a modern web stack focused on speed, scalability, and developer experience.

# Tech Stack
- MERN: MongoDB, Express.js, React.js, Node.js

- Real-time: Socket.io for bidirectional events

- File storage: Cloudinary for media uploads and delivery

- State management: Zustand for simple and scalable global state

- UI: DaisyUI (on top of Tailwind CSS) for accessible, themeable components

# Features
- Authentication (JWT-based with protected routes)

- Show online users in real time via Socket.io

- Real-time messaging and file sharing (images/media via Cloudinary)

- Profile edit (name, avatar, preferences)

# Getting Started
- Backend: Node.js + Express, MongoDB with Mongoose, Socket.io server

- Frontend: React + Vite, Zustand for global state, DaisyUI components

- Configure Cloudinary credentials for uploads and secure delivery

- Run Vite dev server for fast HMR during development
  
# Data Flow Diagram (DFD)

# Level-1 text diagram:

User → Auth Service → Users (MongoDB) → Auth Service → Client (JWT)

Client ↔ Socket.io Presence Service → Broadcast online users to Clients

Client → Messaging Service → Messages (MongoDB) → Messaging Service → Recipient Clients (via Socket.io)

Client → Media Upload Service → Cloudinary → URL → Messaging Service → Messages (MongoDB) → Emit to Clients

Client → Profile Service → Users (MongoDB) → Confirmation to Client

# ASCII diagram:

User (Browser: React + Zustand + Socket.io)
  | 1) Login/Signup (REST)
  v
Auth Service (Express)
  | Validate -> Issue JWT
  v
Client stores JWT (Zustand)
  | 2) Connect Socket.io with auth
  v
Presence Service (Socket.io)
  | Mark online + broadcast presence
  v
Other Clients (Zustand updates)

Messaging:
Client
  | 3) emit send_message(userId, text/fileUrl)
  v
Messaging Service (Socket.io + Express)
  | Persist to MongoDB
  v
Recipients
  | receive message -> update UI (Zustand)

File Sharing:
Client
  | A) Direct upload to Cloudinary (unsigned/signed)
  v
Cloudinary
  | return secure URL
  v
Client -> send_message with URL
  v
Server -> MongoDB -> Recipients

or

Client
  | B) POST file to Node API
  v
Express
  | upload to Cloudinary -> get URL
  v
Client/Server -> send_message with URL -> Recipients

Profile Edit:
Client
  | PUT /profile (name/avatar URL)
  v
Profile Service (Express)
  | Update Users (MongoDB)
  v
Client updates profile UI
