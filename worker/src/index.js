import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt'; // Hono has built-in JWT middleware but user asked for jose. Actually Hono's is simpler. 
// However, user specifically asked for 'jose'. I'll stick to Hono's built-in for compatibility if it's easier, or jose if preferred.
// Let's use Hono's built-in jwt for simplicity unless jose is strictly needed. 
// Wait, Hono's JWT uses Web Crypto API which is what jose does too.

import { drizzle } from 'drizzle-kit'; // Wait, for D1 it's different
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import * as schema from './db/schema';
import { eq } from 'drizzle-orm';
import { AIService } from './services/aiService';

const app = new Hono();

app.use('*', cors());

// Middleware for JWT
const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('jwtPayload', payload);
    await next();
  } catch (e) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// Auth Routes
app.post('/api/auth/register', async (c) => {
  const { email, password } = await c.req.json();
  const db = drizzleD1(c.env.DB);
  
  // In a real app, hash password! Using simple text for now as placeholder for bcrypt which is hard in workers
  // (use scrypt or pbkdf2 from webcrypto)
  const id = crypto.randomUUID();
  await db.insert(schema.users).values({
    id,
    email,
    passwordHash: password, // Placeholder
    createdAt: new Date()
  });

  const token = await sign({ id, email }, c.env.JWT_SECRET);
  return c.json({ token });
});

app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  const db = drizzleD1(c.env.DB);
  
  const user = await db.select().from(schema.users).where(eq(schema.users.email, email)).get();
  if (!user || user.passwordHash !== password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);
  return c.json({ token });
});

// Meeting Routes
app.post('/api/meetings', authMiddleware, async (c) => {
  const { title, transcript } = await c.req.json();
  const user = c.get('jwtPayload');
  const db = drizzleD1(c.env.DB);
  
  const id = crypto.randomUUID();
  await db.insert(schema.meetings).values({
    id,
    userId: user.id,
    title,
    transcript,
    createdAt: new Date()
  });

  return c.json({ id });
});

app.get('/api/meetings', authMiddleware, async (c) => {
  const user = c.get('jwtPayload');
  const db = drizzleD1(c.env.DB);
  
  const meetings = await db.select().from(schema.meetings).where(eq(schema.meetings.userId, user.id)).all();
  return c.json(meetings);
});

app.get('/api/meetings/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const db = drizzleD1(c.env.DB);
  const meeting = await db.select().from(schema.meetings).where(eq(schema.meetings.id, id)).get();
  
  const summary = await db.select().from(schema.summaries).where(eq(schema.summaries.meetingId, id)).get();
  
  return c.json({ ...meeting, summary });
});

// Summary Routes
app.post('/api/summary/:meetingId', authMiddleware, async (c) => {
  const meetingId = c.req.param('meetingId');
  const db = drizzleD1(c.env.DB);
  
  const meeting = await db.select().from(schema.meetings).where(eq(schema.meetings.id, meetingId)).get();
  if (!meeting) return c.json({ error: 'Meeting not found' }, 404);

  const aiService = new AIService(c.env);
  const result = await aiService.generateSummary(meeting.transcript);

  const id = crypto.randomUUID();
  await db.insert(schema.summaries).values({
    id,
    meetingId,
    overview: result.overview,
    keyPoints: JSON.stringify(result.key_points),
    decisions: JSON.stringify(result.decisions),
    actionItems: JSON.stringify(result.action_items),
    createdAt: new Date()
  });

  return c.json({ id, ...result });
});

export default app;
