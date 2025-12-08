// ----------------------
// IMPORTS
// ----------------------
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

// lowdb imports
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

// ----------------------
// SETUP
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// ----------------------
// DATABASE (LOWDB)
// ----------------------
const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);

// LOWDB v6+ requires default data passed to Low()
const defaultData = { users: [], metrics: [] };
const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
}
initDB();

// ----------------------
// JWT SECRET
// ----------------------
const JWT_SECRET = "my_super_secret_key_change_later";

// ----------------------
// AUTH MIDDLEWARE
// ----------------------
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ----------------------
// ROUTES
// ----------------------

// REGISTER USER
app.post("/register", async (req, res) => {
  const { name, email, password, age, weight } = req.body;

  const existing = db.data.users.find((u) => u.email === email);
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = {
    id: nanoid(),
    name,
    email,
    password: hash,
    age,
    weight,
  };

  db.data.users.push(user);
  await db.write();

  res.json({ message: "User registered successfully" });
});

// LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.data.users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ message: "Login successful", token, user });
});

// SAVE USER HEALTH METRICS
app.post("/metrics", authMiddleware, async (req, res) => {
  const { heartRate, bp, spo2, temperature } = req.body;

  const entry = {
    id: nanoid(),
    userId: req.user.id,
    heartRate,
    bp,
    spo2,
    temperature,
    timestamp: Date.now(),
  };

  db.data.metrics.push(entry);
  await db.write();

  return res.json({ message: "Metrics saved", data: entry });
});

// GET USER HEALTH HISTORY
app.get("/metrics", authMiddleware, async (req, res) => {
  const userMetrics = db.data.metrics.filter((m) => m.userId === req.user.id);
  res.json(userMetrics);
});

// ----------------------
// SOCKET.IO REAL-TIME STREAMING
// ----------------------
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send random vitals every 3 seconds
  const interval = setInterval(() => {
    socket.emit("realtimeVitals", {
      heartRate: 70 + Math.floor(Math.random() * 20),
      bp: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
      spo2: 95 + Math.floor(Math.random() * 3),
      temperature: 97 + Math.floor(Math.random() * 3),
    });
  }, 3000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("User disconnected:", socket.id);
  });
});

// ----------------------
// START SERVER
// ----------------------
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
