import UserRepository from "./UserRepository";
import SessionRepository from "./SessionRepository";
import OrganizationRepository from "./OrganizationRepository";

const repositories = {
  user: UserRepository,
  session: SessionRepository,
  organization: OrganizationRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
