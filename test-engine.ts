import "dotenv/config";
import { db } from "./src/db";
import { users, badges, badgeAwards, xpLedger } from "./src/db/schema";
import { awardXpAndEvaluate } from "./src/server/services/gamification/badge";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Fetching a demo user...");
  const [user] = await db.select().from(users).limit(1);
  if (!user) {
    console.error("No users found in the DB. Please run db:seed first.");
    process.exit(1);
  }

  console.log(`Testing with User: ${user.name} (ID: ${user.id}), Current XP: ${user.totalXp}`);

  // Test awarding XP
  console.log("Awarding 200 XP for a CSR activity...");
  const result = await awardXpAndEvaluate(user.id, 200, { source: "csr:test-script", deptIsLowest: true });
  console.log("Award Result:", result);

  // Fetch updated user
  const [updatedUser] = await db.select().from(users).where(eq(users.id, user.id));
  console.log(`Updated XP: ${updatedUser.totalXp}`);

  // Check ledger
  const ledger = await db.select().from(xpLedger).where(eq(xpLedger.userId, user.id));
  console.log("XP Ledger Entries:", ledger.length);

  // Check badges
  const userBadges = await db.select().from(badgeAwards).where(eq(badgeAwards.userId, user.id));
  console.log("Badges Awarded:", userBadges.length);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
