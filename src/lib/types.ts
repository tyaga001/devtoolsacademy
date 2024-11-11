export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string[];
  githubStars: number;
  githubUrl: string;
  websiteUrl: string;
  tags: string[];
  lastUpdate: string;
  license: string;
}
