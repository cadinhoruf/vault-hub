import type { Project } from "../project/project.interface";
import type { Prisma } from "@prisma/client";

/**
 * Represents a ProjectEnvironments entity.
 */
export interface ProjectEnvironments {
  /** Id's id property */
  id: string;
  /** ProjectId's projectId property */
  projectId: string;
  /** Related Project entity */
  project: Project;
  /** Variables's variables property */
  variables: Prisma.InputJsonValue | Prisma.JsonValue;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new ProjectEnvironments.
 */
export interface CreateProjectEnvironmentsDTO {
  /** Id's id property  */
  id: string;
  /** ProjectId's projectId property  */
  projectId: string;
  /** Variables's variables property  */
  variables: Prisma.InputJsonValue;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
}

/**
 * Data transfer object for updating an existing ProjectEnvironments.
 */
export interface UpdateProjectEnvironmentsDTO {
  /** Id's id property  */
  id?: string;
  /** ProjectId's projectId property  */
  projectId?: string;
  /** Variables's variables property  */
  variables?: Prisma.InputJsonValue;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
}

/**
 * Query parameters for fetching ProjectEnvironments entities
 */
export interface ProjectEnvironmentsQueryParams {
  /** Current page number for pagination */
  page?: number;
  /** Number of items to return per page */
  limit?: number;
  /** Property to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: "asc" | "desc";
  /** Search term for filtering */
  search?: string;
}
