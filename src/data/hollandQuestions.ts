export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  text: string;
  type: RIASECType;
}

export const riasecLabels: Record<RIASECType, string> = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
};

export const riasecDescriptions: Record<RIASECType, { title: string; description: string; careers: string[] }> = {
  R: {
    title: 'The Doer',
    description: 'Realistic individuals are practical, hands-on people who enjoy working with tools, machines, and physical objects. They prefer concrete tasks and often excel in mechanical or athletic abilities.',
    careers: ['Engineer', 'Mechanic', 'Electrician', 'Pilot', 'Chef', 'Carpenter', 'Surgeon', 'Athlete'],
  },
  I: {
    title: 'The Thinker',
    description: 'Investigative individuals are analytical, intellectual, and curious. They enjoy solving complex problems, conducting research, and working with ideas rather than people.',
    careers: ['Scientist', 'Doctor', 'Professor', 'Researcher', 'Data Analyst', 'Pharmacist', 'Psychologist', 'Economist'],
  },
  A: {
    title: 'The Creator',
    description: 'Artistic individuals are creative, imaginative, and expressive. They value aesthetics and self-expression, preferring unstructured environments that allow for innovation.',
    careers: ['Artist', 'Designer', 'Writer', 'Musician', 'Actor', 'Photographer', 'Architect', 'Film Director'],
  },
  S: {
    title: 'The Helper',
    description: 'Social individuals are friendly, cooperative, and enjoy helping others. They thrive in environments where they can teach, counsel, or provide service to people.',
    careers: ['Teacher', 'Counselor', 'Nurse', 'Social Worker', 'Therapist', 'HR Manager', 'Coach', 'Community Organizer'],
  },
  E: {
    title: 'The Persuader',
    description: 'Enterprising individuals are ambitious, energetic, and persuasive. They enjoy leading, influencing others, and taking on challenges in competitive environments.',
    careers: ['Entrepreneur', 'Sales Manager', 'Lawyer', 'CEO', 'Marketing Director', 'Politician', 'Real Estate Agent', 'Consultant'],
  },
  C: {
    title: 'The Organizer',
    description: 'Conventional individuals are detail-oriented, organized, and prefer structured environments. They excel at working with data, numbers, and established procedures.',
    careers: ['Accountant', 'Administrator', 'Banker', 'Auditor', 'Secretary', 'Actuary', 'Tax Consultant', 'Quality Controller'],
  },
};

export const questions: Question[] = [
  // Realistic Questions
  { id: 1, text: 'I enjoy working with my hands to build or fix things.', type: 'R' },
  { id: 2, text: 'I prefer outdoor activities over indoor work.', type: 'R' },
  { id: 3, text: 'I like operating machinery or tools.', type: 'R' },
  { id: 4, text: 'I enjoy physical activities and sports.', type: 'R' },
  { id: 5, text: 'I prefer practical tasks over theoretical discussions.', type: 'R' },
  { id: 6, text: 'I like working with animals or plants.', type: 'R' },
  { id: 7, text: 'I enjoy assembling or installing equipment.', type: 'R' },

  // Investigative Questions
  { id: 8, text: 'I enjoy solving complex puzzles and problems.', type: 'I' },
  { id: 9, text: 'I like conducting experiments or research.', type: 'I' },
  { id: 10, text: 'I enjoy reading scientific or technical articles.', type: 'I' },
  { id: 11, text: 'I prefer analyzing data to understand patterns.', type: 'I' },
  { id: 12, text: 'I like asking questions and seeking answers.', type: 'I' },
  { id: 13, text: 'I enjoy learning about how things work.', type: 'I' },
  { id: 14, text: 'I prefer independent study over group projects.', type: 'I' },

  // Artistic Questions
  { id: 15, text: 'I enjoy expressing myself through art, music, or writing.', type: 'A' },
  { id: 16, text: 'I like designing or decorating spaces.', type: 'A' },
  { id: 17, text: 'I prefer creative tasks over routine work.', type: 'A' },
  { id: 18, text: 'I enjoy attending cultural events or performances.', type: 'A' },
  { id: 19, text: 'I like imagining new ideas or concepts.', type: 'A' },
  { id: 20, text: 'I prefer environments where I can be original and innovative.', type: 'A' },
  { id: 21, text: 'I enjoy photography, filmmaking, or visual storytelling.', type: 'A' },

  // Social Questions
  { id: 22, text: 'I enjoy helping others solve their problems.', type: 'S' },
  { id: 23, text: 'I like teaching or training people.', type: 'S' },
  { id: 24, text: 'I prefer working in teams over working alone.', type: 'S' },
  { id: 25, text: 'I enjoy volunteering for community service.', type: 'S' },
  { id: 26, text: 'I like listening to others and providing support.', type: 'S' },
  { id: 27, text: 'I prefer jobs that involve caring for people.', type: 'S' },
  { id: 28, text: 'I enjoy organizing group activities or events.', type: 'S' },

  // Enterprising Questions
  { id: 29, text: 'I enjoy leading projects or teams.', type: 'E' },
  { id: 30, text: 'I like persuading others to see my point of view.', type: 'E' },
  { id: 31, text: 'I prefer taking risks to achieve goals.', type: 'E' },
  { id: 32, text: 'I enjoy negotiating deals or agreements.', type: 'E' },
  { id: 33, text: 'I like starting new projects or businesses.', type: 'E' },
  { id: 34, text: 'I prefer competitive environments.', type: 'E' },
  { id: 35, text: 'I enjoy public speaking or presenting ideas.', type: 'E' },

  // Conventional Questions
  { id: 36, text: 'I enjoy organizing files, data, or records.', type: 'C' },
  { id: 37, text: 'I like following established procedures and rules.', type: 'C' },
  { id: 38, text: 'I prefer working with numbers and calculations.', type: 'C' },
  { id: 39, text: 'I enjoy attention to detail in my work.', type: 'C' },
  { id: 40, text: 'I like planning and scheduling tasks.', type: 'C' },
  { id: 41, text: 'I prefer structured environments with clear expectations.', type: 'C' },
  { id: 42, text: 'I enjoy working with spreadsheets or databases.', type: 'C' },
];
