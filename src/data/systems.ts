import { formatDate } from "./patient";
import type { ConnectedSystem } from "../components/ui/ConnectedSystems";

export const connectedSystems: readonly ConnectedSystem[] = [
  { name: "BadgerNet Maternity", updated: `${formatDate("2026-10-05")}, 9:12am`, status: "primary" },
  { name: "GP record", updated: `${formatDate("2026-10-05")}, 8:45am`, status: "connected" },
  { name: "Lab results", updated: `${formatDate("2026-10-05")}, 7:30am`, status: "connected" },
  { name: "Diabetes service", updated: `${formatDate("2026-10-04")}, 4:20pm`, status: "connected" },
  { name: "Perinatal mental health", updated: `${formatDate("2026-10-03")}, 2:05pm`, status: "connected" },
  { name: "Ultrasound department", updated: `${formatDate("2026-09-30")}, 11:40am`, status: "connected" },
  { name: "Interpreter booking", updated: `${formatDate("2026-10-05")}, 9am`, status: "connected" },
  { name: "Social support and community", updated: `${formatDate("2026-10-01")}, 10:15am`, status: "partial" },
];
