import bcrypt from 'bcrypt'
import sqlite from 'better-sqlite3'

export const db = sqlite(':memory:')

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
        id STRING PRIMARY KEY,    
        user_id INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

const users = [
  {
    id: 1,
    email: 'daspetemail@gmail.com',
    password: bcrypt.hashSync('testingpassword', 10)
  }
]

for (const user of users) {
  db.prepare(
    `
    INSERT INTO users (
        id, 
        email, 
        password
    ) VALUES (?, ?, ?)
  `
  ).run(user.id, user.email, user.password)
}

export interface DatabaseUser {
  id: number
  email: string
  password: string
}
