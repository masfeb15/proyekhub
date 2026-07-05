import type { ProjectStatus } from "@/lib/constants/project-status"

export interface Project {
  id: string

  companyId: string

  clientId: string

  projectCode: string

  projectName: string

  contractValue: number

  startDate: string

  finishDate: string

  status: ProjectStatus

  createdAt: string

  updatedAt: string
}