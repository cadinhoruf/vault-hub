import type { ProjectEnvironments } from "@/features/projectenvironments/projectenvironments.interface";

/**
 * Represents a Project entity.
 */
export interface Project {
  /** Id's id property */
  id: string;
  /** Name's name property */
  name: string;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
  /** RepositoryUrl's repositoryUrl property */
  repositoryUrl: string;
  /** RepositoryId's repositoryId property */
  repositoryId: string;
  /** Related ProjectEnvironments entities */
  environments?: ProjectEnvironments[];
}

/**
 * Data transfer object for creating a new Project.
 */
export interface CreateProjectDTO {
  /** Id's id property  */
  id: string;
  /** Name's name property  */
  name: string;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
  /** RepositoryUrl's repositoryUrl property  */
  repositoryUrl: string;
  /** RepositoryId's repositoryId property  */
  repositoryId: string;
  /** Array of IDs for the ProjectEnvironments relationships to be created */
  environmentsIds?: string[];
}

/**
 * Data transfer object for updating an existing Project.
 */
export interface UpdateProjectDTO {
  /** Id's id property  */
  id?: string;
  /** Name's name property  */
  name?: string;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
  /** RepositoryUrl's repositoryUrl property  */
  repositoryUrl?: string;
  /** RepositoryId's repositoryId property  */
  repositoryId?: string;
  /** Array of IDs for the ProjectEnvironments relationships to be created */
  environmentsIds?: string[];
}

/**
 * Query parameters for fetching Project entities
 */
export interface ProjectQueryParams {
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
