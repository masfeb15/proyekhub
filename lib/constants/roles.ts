export const ROLES = [
  "SUPER_ADMIN",
  "COMPANY_ADMIN",
  "PROJECT_MANAGER",
  "SITE_ENGINEER",
  "QS",
  "LOGISTIC",
  "DIRECTOR",
] as const

export type UserRole =
  typeof ROLES[number]