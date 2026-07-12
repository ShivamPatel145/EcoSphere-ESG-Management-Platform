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

  // --- REWARD REDEMPTION TEST ---
  console.log("\n--- Testing Reward Redemption ---");
  const { getPointsBalance, redeem } = await import("./src/server/services/gamification/reward");
  const { rewards } = await import("./src/db/schema");

  const balanceBefore = await getPointsBalance(user.id);
  console.log("Points Balance Before:", balanceBefore);

  // Create a temporary reward for testing
  const [testReward] = await db.insert(rewards).values({
    name: "Test Reward (Mug)",
    description: "A cool mug",
    pointsRequired: 50,
    stock: 2,
    status: "ACTIVE"
  }).returning();

  console.log(`Created Reward: ${testReward.name} (Requires: ${testReward.pointsRequired} pts, Stock: ${testReward.stock})`);

  // Attempt redemption 1
  try {
    const res = await redeem(user.id, testReward.id);
    console.log("Redemption 1:", res.success ? "Success" : "Failed");
  } catch(e: any) {
    console.log("Redemption 1 Error:", e.message);
  }

  const balanceAfter1 = await getPointsBalance(user.id);
  console.log("Points Balance After 1:", balanceAfter1);

  // Attempt redemption 2
  try {
    const res = await redeem(user.id, testReward.id);
    console.log("Redemption 2:", res.success ? "Success" : "Failed");
  } catch(e: any) {
    console.log("Redemption 2 Error:", e.message);
  }

  // Attempt redemption 3 (Should fail due to stock)
  try {
    const res = await redeem(user.id, testReward.id);
    console.log("Redemption 3:", res.success ? "Success" : "Failed");
  } catch(e: any) {
    console.log("Redemption 3 Error:", e.message);
  }

  const [finalReward] = await db.select().from(rewards).where(eq(rewards.id, testReward.id));
  console.log("Final Reward Stock:", finalReward.stock);

  // Assert Total XP didn't change
  const [finalUser] = await db.select().from(users).where(eq(users.id, user.id));
  console.log(`Final Total XP: ${finalUser.totalXp} (Should match original: ${updatedUser.totalXp})`);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
