export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: "live" | "coming soon";
  description: string;
  body: string[];
  appStoreUrl?: string;
  websiteUrl?: string;
  founder: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "wyd",
    title: "$WYD",
    tagline: "Ping your friends. Messages disappear.",
    category: "Social Networking",
    year: "2025",
    status: "live",
    description:
      "Peak efficiency for the terminally online brain. One tap, one question — WYD? No typing. No read receipts. Just pure signal.",
    body: [
      "Remember communication? Neither do we. That's why we made $WYD.",
      "Double tap a friend's name and send 'WYD?' instantly. No typing long messages. No read receipts to stress over. No complex group chats. Just pure, glorious 'WYD?'",
      "SUPER WYD for MAXIMUM Impact — need to really know WYD? Hit 'em with a SUPER WYD. It's louder, it's more annoying, it's worth more points.",
      "Every tap gives you points. Send WYDs daily, keep streaks alive with your besties. Watch the number go up. Why? Don't ask questions. Just get points.",
    ],
    appStoreUrl:
      "https://apps.apple.com/us/app/wyd-check-in-with-friends/id6742663575?ppid=strandandstonellc&pt=strandandstonellc&ct=website",
    websiteUrl: "https://thewyd.app/?ref=strandandstonellc",
    founder: "John Meeker",
  },
  {
    id: "02",
    slug: "real-authenticator",
    title: "Real Authenticator",
    tagline: "Identity verification with the people you trust.",
    category: "Security",
    year: "2025",
    status: "live",
    description:
      "In a world of AI voice cloning and deepfakes, Real Authenticator gives you and your trusted contacts a private, unforgeable way to verify identity.",
    body: [
      "A voice. A face. A phone number. AI has made every one of these trivially fakeable. Real Authenticator gives you a human-to-human layer that no AI can replicate.",
      "Share time-based verification codes with trusted contacts. Encrypted, on-device, and secured with Face ID — the human-to-human 2FA system designed for privacy.",
      "Industry-standard TOTP codes that rotate every 30 seconds, making them impossible to reuse or steal. No email required. Sign in with Apple. Zero tracking.",
      "From protecting your family from grandparent scams to verifying your bank before you say anything — Real Authenticator reverses the burden of proof back to the people calling you.",
    ],
    appStoreUrl:
      "https://apps.apple.com/us/app/real-authenticator/id6759113805?ppid=strandandstonellc&pt=strandandstonellc&ct=website",
    websiteUrl: "https://www.realauthenticator.app/?ref=strandandstonellc",
    founder: "Phil Boscarino",
  },
  {
    id: "03",
    slug: "elfie-spot-finder",
    title: "Elfie Spot Finder",
    tagline: "Never run out of elf hiding spots.",
    category: "Lifestyle",
    year: "2025",
    status: "live",
    description:
      "The #1 way to end late-night elf panic. AI finds perfect, creative hiding spots so you can get to bed instead of thinking at midnight.",
    body: [
      "Running out of hiding spots by December 5th? Elfie instantly finds the sneakiest, most genius places in any room.",
      "Snap a photo of any room, Elfie reveals perfect hiding spots your kids will never guess, place your elf and sleep easy. That's it.",
      "No more 2am emergencies. Fresh unique ideas delivered every day. Works in any room. From chandeliers to cereal boxes, bookshelves to bathtubs — Elfie's got 25 nights of mischief covered.",
      "Smart tracking ensures you never use the same spot twice, keeping the magic alive all season long.",
    ],
    appStoreUrl:
      "https://apps.apple.com/us/app/elfie-spot-finder/id6755905472?ppid=strandandstonellc&pt=strandandstonellc&ct=website",
    websiteUrl: "https://elfiespotfinder.com/?ref=strandandstonellc",
    founder: "Phil Boscarino",
  },
  {
    id: "04",
    slug: "syncupalarm",
    title: "SyncUpAlarm",
    tagline: "Wake up together — even when you’re apart.",
    category: "Lifestyle",
    year: "2026",
    status: "live",
    description:
      "Synced alarms for couples and close circles on iPhone — same beat, same morning, without the chaos. Pair once, stay in lockstep across time zones and travel.",
    body: [
      "Mornings are easier when you’re not negotiating who’s up first. SyncUpAlarm keeps two (or more) iPhones on the same rhythm — invite, connect, and let the alarm do the coordinating.",
      "Set your wake time once; the app keeps alarms aligned down to the second. Optional soft ramps and haptics keep things human instead of harsh.",
      "Built for distance, shift work, roommates, and anyone who’d rather share a routine than chase each other with texts. Schedules stay private — sync without the feed.",
      "Widgets, shortcuts, and streaks for the people who like a little structure and a little play. Marketing site and product at syncupalarm.com.",
    ],
    websiteUrl: "https://syncupalarm.com/?ref=strandandstonellc",
    founder: "Strand & Stone LLC",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
