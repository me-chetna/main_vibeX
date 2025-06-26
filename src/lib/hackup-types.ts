export interface TeamRequest {
  id: string;
  projectName: string;
  projectDescription: string;
  roles: string[];
  skills: string[];
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  hackathonDate: Date;
}
