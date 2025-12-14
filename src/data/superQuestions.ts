export type SuperDimension = 'CP' | 'CE' | 'DM' | 'WO' | 'SC';

export interface SuperQuestion {
  id: number;
  text: string;
  dimension: SuperDimension;
}

export const superDimensionLabels: Record<SuperDimension, string> = {
  CP: 'Career Planning',
  CE: 'Career Exploration',
  DM: 'Decision Making',
  WO: 'World of Work Knowledge',
  SC: 'Self-Concept Clarity',
};

export const superDimensionDescriptions: Record<SuperDimension, {
  title: string;
  description: string;
  tips: string[];
  level: { low: string; medium: string; high: string };
}> = {
  CP: {
    title: 'Future Planner',
    description: 'This measures how actively you think about and plan for your future career. Strong career planning involves setting goals, identifying steps to achieve them, and considering how current choices affect future opportunities.',
    tips: [
      'Research careers that interest you using online resources',
      'Talk to people working in fields you find interesting',
      'Set short-term and long-term career goals',
      'Create a timeline for your educational and career milestones',
    ],
    level: {
      low: 'You may benefit from spending more time thinking about your future career path. Try setting aside time each week to explore different career options.',
      medium: 'You have started thinking about your career but could develop more detailed plans. Consider creating specific goals with timelines.',
      high: 'You are actively planning for your future! Continue to refine your plans as you learn more about yourself and career options.',
    },
  },
  CE: {
    title: 'Active Explorer',
    description: 'This measures how actively you seek information about careers and educational opportunities. Exploration involves researching different fields, trying new activities, and gathering information to make informed decisions.',
    tips: [
      'Job shadow or intern in fields that interest you',
      'Join clubs and activities related to potential careers',
      'Attend career fairs and college visits',
      'Read about different industries and job roles',
    ],
    level: {
      low: 'Increasing your exploration activities will help you discover careers you might not have considered. Try one new exploration activity this month.',
      medium: 'You are exploring career options but could expand your search. Consider exploring careers outside your current interests.',
      high: 'You are actively exploring many options! Use what you learn to narrow down your choices and deepen your understanding.',
    },
  },
  DM: {
    title: 'Confident Decider',
    description: 'This measures your confidence and skill in making career-related decisions. Good decision-making involves weighing options, considering consequences, and feeling confident about your choices.',
    tips: [
      'Practice making decisions using a pros and cons list',
      'Discuss important decisions with trusted adults',
      'Learn about different decision-making strategies',
      'Reflect on past decisions and what you learned from them',
    ],
    level: {
      low: 'Decision-making is a skill that improves with practice. Start with smaller decisions and build up to larger ones.',
      medium: 'You can make decisions but may sometimes feel uncertain. Building a decision-making framework can increase your confidence.',
      high: 'You approach decisions with confidence! Continue to refine your process and stay open to new information.',
    },
  },
  WO: {
    title: 'Work-World Savvy',
    description: 'This measures your understanding of the working world, including different careers, industries, and what it takes to succeed professionally. This knowledge helps you make realistic career plans.',
    tips: [
      'Research what education and skills different careers require',
      'Learn about workplace expectations and professional behavior',
      'Understand how different industries and jobs connect',
      'Stay updated on job market trends and emerging careers',
    ],
    level: {
      low: 'Building your knowledge of the work world will help you make more informed decisions. Start researching careers that interest you.',
      medium: 'You have some work world knowledge but gaps remain. Focus on understanding the practical aspects of careers that interest you.',
      high: 'You have a good understanding of the work world! Keep learning as careers and industries continue to evolve.',
    },
  },
  SC: {
    title: 'Self-Aware',
    description: 'This measures how well you understand your own interests, abilities, values, and personality. Strong self-concept helps you choose careers that will be personally fulfilling and align with who you are.',
    tips: [
      'Reflect on what activities make you feel energized and engaged',
      'Identify your core values and what matters most to you',
      'Ask trusted people for feedback on your strengths',
      'Keep a journal to track your thoughts and feelings about different experiences',
    ],
    level: {
      low: 'Developing greater self-awareness will help you find careers that truly fit you. Try new activities and reflect on your reactions.',
      medium: 'You have some self-awareness but could go deeper. Consider what values and interests are most central to who you are.',
      high: 'You have strong self-awareness! Use this knowledge to guide your career exploration and planning.',
    },
  },
};

// Questions adapted for 9th-12th grade students based on Super's Career Development Theory
export const superQuestions: SuperQuestion[] = [
  // Career Planning (CP)
  { id: 101, text: 'I have thought about what job or career I might want in the future.', dimension: 'CP' },
  { id: 102, text: 'I have specific career goals that I am working toward.', dimension: 'CP' },
  { id: 103, text: 'I know what steps I need to take to prepare for my future career.', dimension: 'CP' },
  { id: 104, text: 'I think about how my current classes relate to my future career.', dimension: 'CP' },
  
  // Career Exploration (CE)
  { id: 105, text: 'I actively look for information about careers that interest me.', dimension: 'CE' },
  { id: 106, text: 'I have talked to adults about their jobs and careers.', dimension: 'CE' },
  { id: 107, text: 'I have tried different activities to discover what I might enjoy as a career.', dimension: 'CE' },
  { id: 108, text: 'I research colleges, training programs, or apprenticeships related to careers I am considering.', dimension: 'CE' },
  
  // Decision Making (DM)
  { id: 109, text: 'I feel confident making important decisions about my future.', dimension: 'DM' },
  { id: 110, text: 'When I need to make a decision, I carefully consider my options before choosing.', dimension: 'DM' },
  { id: 111, text: 'I can identify what is most important to me when making career decisions.', dimension: 'DM' },
  { id: 112, text: 'I am comfortable making decisions even when I do not have all the information.', dimension: 'DM' },
  
  // World of Work Knowledge (WO)
  { id: 113, text: 'I understand what kind of education or training different careers require.', dimension: 'WO' },
  { id: 114, text: 'I know about different types of jobs and what people do in those jobs.', dimension: 'WO' },
  { id: 115, text: 'I understand how to search for jobs and what employers look for when hiring.', dimension: 'WO' },
  { id: 116, text: 'I am aware of job trends and which careers are growing or declining.', dimension: 'WO' },
  
  // Self-Concept Clarity (SC)
  { id: 117, text: 'I have a clear understanding of my interests and what I enjoy doing.', dimension: 'SC' },
  { id: 118, text: 'I know what my strengths and abilities are.', dimension: 'SC' },
  { id: 119, text: 'I understand what values are most important to me in a future career.', dimension: 'SC' },
  { id: 120, text: 'I can describe my personality and how it might fit different careers.', dimension: 'SC' },
];

export const getCareerMaturityLevel = (percentage: number): 'low' | 'medium' | 'high' => {
  if (percentage < 40) return 'low';
  if (percentage < 70) return 'medium';
  return 'high';
};

export const getOverallReadinessInterpretation = (overallPercentage: number): {
  level: string;
  message: string;
  recommendations: string[];
} => {
  if (overallPercentage < 40) {
    return {
      level: 'Developing',
      message: 'You are in the early stages of career readiness. This is completely normal for high school students! Focus on exploration and building self-awareness.',
      recommendations: [
        'Take time to explore different activities and subjects',
        'Start conversations with adults about their careers',
        'Reflect on what you enjoy and what comes naturally to you',
        'Consider meeting with your school counselor',
      ],
    };
  }
  if (overallPercentage < 70) {
    return {
      level: 'Progressing',
      message: 'You are making good progress in your career development journey. You have started exploring options and building self-awareness.',
      recommendations: [
        'Deepen your exploration in areas that interest you most',
        'Create more specific career goals and timelines',
        'Seek out job shadowing or internship opportunities',
        'Research education requirements for careers of interest',
      ],
    };
  }
  return {
    level: 'Advanced',
    message: 'You demonstrate strong career readiness! You have a good understanding of yourself and the world of work, and you are actively planning for your future.',
    recommendations: [
      'Continue refining your career plans as you learn more',
      'Mentor peers who are earlier in their career exploration',
      'Seek leadership roles in career-related activities',
      'Stay flexible and open to new opportunities',
    ],
  };
};
