import { notificationTypeEnum } from "@/db/schema";

export async function notify(
  userId: string, 
  type: typeof notificationTypeEnum.enumValues[number], 
  title: string, 
  body?: string
) {
  // STUB: Shivam will implement this in Prompt 3.
  console.log(`[STUB NOTIFY] ${userId} | ${type} | ${title} | ${body}`);
}
