import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = "xperience" // Your database name

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDb() {
  if (cachedDb) {
    return cachedDb
  }
  const { db } = await connectToDatabase()
  return db
}
