import { users, type User, type InsertUser, applications, type Application, type InsertApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Define the AboutUs type
export interface AboutUs {
  id: string;
  content: string;
  updatedAt: string;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Application methods
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
  getApplicationById(id: number): Promise<Application | undefined>;
  
  // About Us methods
  getAboutUs(): Promise<AboutUs | undefined>;
  updateAboutUs(content: string): Promise<AboutUs>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }
  
  async getApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }
  
  async getApplicationById(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application || undefined;
  }
  
  // For AboutUs, we'll need to create a table in the database
  // I'll implement a simpler version here using a fixed ID
  async getAboutUs(): Promise<AboutUs | undefined> {
    // You'll need to create an aboutUs table in your schema.ts file
    // For now, this is a simplified implementation
    try {
      const result = await db.execute(
        `SELECT * FROM about_us WHERE id = 'default' LIMIT 1`
      );
      if (result.rows && result.rows.length > 0) {
        return result.rows[0] as AboutUs;
      }
      return undefined;
    } catch (e) {
      // Table might not exist yet
      await this.createAboutUsTable();
      return undefined;
    }
  }
  
  async updateAboutUs(content: string): Promise<AboutUs> {
    try {
      const aboutUs = await this.getAboutUs();
      const updatedAt = new Date().toISOString();
      
      if (aboutUs) {
        const result = await db.execute(
          `UPDATE about_us SET content = $1, "updatedAt" = $2 WHERE id = 'default' RETURNING *`,
          [content, updatedAt]
        );
        return result.rows[0] as AboutUs;
      } else {
        const result = await db.execute(
          `INSERT INTO about_us (id, content, "updatedAt") VALUES ('default', $1, $2) RETURNING *`,
          [content, updatedAt]
        );
        return result.rows[0] as AboutUs;
      }
    } catch (e) {
      await this.createAboutUsTable();
      return this.updateAboutUs(content);
    }
  }
  
  private async createAboutUsTable() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS about_us (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      )
    `);
  }
}

export const storage = new DatabaseStorage();
