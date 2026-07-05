export const PROJECT_STATUS = [
  "DRAFT",
  "TENDER",
  "AWARDED",
  "MOBILIZATION",
  "RUNNING",
  "PUNCH_LIST",
  "COMPLETED",
  "CLOSED",
  "CANCELLED",
] as const

export type ProjectStatus =
  typeof PROJECT_STATUS[number]