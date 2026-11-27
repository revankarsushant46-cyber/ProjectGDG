import type { Accent } from './accent'

export type Domain = 'Core' | 'Dev' | 'CP' | 'Design' | 'AI/ML' | 'Cloud'
export type Tier = 'lead' | 'core' | 'junior' | 'member'

export type Repo = { name: string; description: string; language: string; href: string }

export type Member = {
  slug: string
  name: string
  initials: string
  role: string
  tier: Tier
  domain: Domain
  accent: Accent
  bio: string
  /** Drop a face photo into /public/images/team and set the path here. */
  photo?: string
  year: string
  skills: string[]
  contributions: string[]
  repos?: Repo[]
  focus?: string
  github: string
  linkedin: string
}

const gh = (u: string) => `https://github.com/${u}`
const li = (u: string) => `https://www.linkedin.com/in/${u}`
const repo = (user: string, name: string, description: string, language: string): Repo => ({
  name,
  description,
  language,
  href: `https://github.com/${user}/${name}`,
})

export const DOMAIN_ACCENT: Record<Domain, Accent> = {
  Core: 'blue',
  Dev: 'green',
  CP: 'red',
  Design: 'yellow',
  'AI/ML': 'red',
  Cloud: 'yellow',
}

export const TEAM: Member[] = [
  // Leadership
  {
    slug: 'ananya-rao',
    name: 'Ananya Rao',
    initials: 'AR',
    role: 'President',
    tier: 'lead',
    domain: 'Core',
    accent: 'blue',
    year: '4th year · CSE',
    bio: 'Keeps the chapter pointed at one question: what did we actually build this month? Happiest when a first-timer demos on stage.',
    focus: 'Chapter direction, partnerships and making sure every event ends with something shipped.',
    skills: ['Community building', 'TypeScript', 'Product thinking', 'Public speaking', 'Go'],
    contributions: [
      'Started the monthly “ship night” format that now anchors the calendar',
      'Led the Build Weekend from idea to a 36-hour, three-track event',
      'Wrote the chapter’s open onboarding guide for new volunteers',
    ],
    repos: [
      repo('ananya-rao-demo', 'gdg-rvce-handbook', 'Open handbook for running student community events.', 'MDX'),
      repo('ananya-rao-demo', 'ship-night-bot', 'Tiny bot that collects demo sign-ups for ship night.', 'TypeScript'),
      repo('ananya-rao-demo', 'campus-map-cli', 'A terminal campus map for lost first-years.', 'Go'),
    ],
    github: gh('ananya-rao-demo'),
    linkedin: li('ananya-rao-demo'),
  },
  {
    slug: 'siddharth-nair',
    name: 'Siddharth Nair',
    initials: 'SN',
    role: 'Vice President',
    tier: 'lead',
    domain: 'Core',
    accent: 'red',
    year: '4th year · ISE',
    bio: 'Operations, logistics and the spreadsheet nobody else wants to open. Believes a good event feels effortless because someone sweated the details.',
    focus: 'Operations, volunteer coordination and keeping the vertical heads unblocked.',
    skills: ['Operations', 'Python', 'Data analysis', 'Notion', 'Rust'],
    contributions: [
      'Built the volunteer rota system used across every event',
      'Cut event setup time in half with reusable venue checklists',
      'Mentored the first batch of junior core members',
    ],
    repos: [
      repo('sid-nair-demo', 'event-ops-kit', 'Checklists and templates for running campus events.', 'Markdown'),
      repo('sid-nair-demo', 'rota', 'A small scheduler for volunteer shifts.', 'Rust'),
    ],
    github: gh('sid-nair-demo'),
    linkedin: li('sid-nair-demo'),
  },

  // Vertical heads — core team
  {
    slug: 'arjun-menon',
    name: 'Arjun Menon',
    initials: 'AM',
    role: 'Dev Head',
    tier: 'core',
    domain: 'Dev',
    accent: 'green',
    year: '3rd year · CSE',
    bio: 'Full-stack tinkerer who reviews every pull request with a gif. Runs the dev vertical and the chapter’s open-source projects.',
    focus: 'Web and app development workshops, code reviews and the chapter’s open-source repos.',
    skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Kotlin', 'System design'],
    contributions: [
      'Maintains this website and its component library',
      'Ran “Web, beyond the browser” and three earlier web labs',
      'Introduced code-review pairing for first-time contributors',
    ],
    repos: [
      repo('arjun-menon-demo', 'gdg-rvce-site', 'This website — blueprints, frames and all.', 'TypeScript'),
      repo('arjun-menon-demo', 'mess-menu-api', 'A tiny API for the hostel mess menu.', 'TypeScript'),
      repo('arjun-menon-demo', 'pr-gif-action', 'GitHub Action that replies to PRs with an appropriate gif.', 'JavaScript'),
    ],
    github: gh('arjun-menon-demo'),
    linkedin: li('arjun-menon-demo'),
  },
  {
    slug: 'tanvi-hegde',
    name: 'Tanvi Hegde',
    initials: 'TH',
    role: 'CP Head',
    tier: 'core',
    domain: 'CP',
    accent: 'red',
    year: '3rd year · CSE',
    bio: 'Competitive programmer who turns contest problems into lunch-break puzzles. Runs the weekly practice ladder.',
    focus: 'Weekly contests, problem-solving sessions and interview prep circles.',
    skills: ['C++', 'Algorithms', 'Graph theory', 'Dynamic programming', 'Problem setting'],
    contributions: [
      'Set the problems for the chapter’s first internal contest',
      'Runs a weekly practice ladder with editorial write-ups',
      'Started the “explain it to a first-year” problem review format',
    ],
    repos: [
      repo('tanvi-hegde-demo', 'cp-ladder', 'Curated practice ladder with editorials.', 'C++'),
      repo('tanvi-hegde-demo', 'contest-judge-lite', 'A minimal local judge for practice contests.', 'Python'),
    ],
    github: gh('tanvi-hegde-demo'),
    linkedin: li('tanvi-hegde-demo'),
  },
  {
    slug: 'diya-prakash',
    name: 'Diya Prakash',
    initials: 'DP',
    role: 'Design Head',
    tier: 'core',
    domain: 'Design',
    accent: 'yellow',
    year: '3rd year · ECE',
    bio: 'Draws blueprints for fun. Responsible for the chapter’s visual language — including every grid line on this page.',
    focus: 'Brand, event visuals, UI reviews and accessibility.',
    skills: ['Figma', 'Design systems', 'Accessibility', 'Motion design', 'Illustration'],
    contributions: [
      'Designed the blueprint visual system used across the chapter',
      'Led the “Accessible by default” workshop',
      'Runs fortnightly UI critique sessions',
    ],
    repos: [repo('diya-prakash-demo', 'blueprint-tokens', 'Design tokens behind the GDG RVCE blueprint look.', 'CSS')],
    github: gh('diya-prakash-demo'),
    linkedin: li('diya-prakash-demo'),
  },
  {
    slug: 'kavya-iyengar',
    name: 'Kavya Iyengar',
    initials: 'KI',
    role: 'AI/ML Head',
    tier: 'core',
    domain: 'AI/ML',
    accent: 'red',
    year: '3rd year · AIML',
    bio: 'Builds small, useful models and explains them without jargon. Hosts “Build with AI” and the reading group.',
    focus: 'Applied AI workshops, the paper reading group and project mentorship.',
    skills: ['Python', 'PyTorch', 'LLM apps', 'Prompt design', 'Data viz'],
    contributions: [
      'Hosts the “Build with AI” workshop series',
      'Started a fortnightly paper reading group',
      'Mentored four teams at Build Weekend',
    ],
    repos: [
      repo('kavya-iyengar-demo', 'prompt-lab', 'Notebook collection for testing prompts systematically.', 'Python'),
      repo('kavya-iyengar-demo', 'tiny-classifier', 'A beginner-friendly image classifier walkthrough.', 'Python'),
    ],
    github: gh('kavya-iyengar-demo'),
    linkedin: li('kavya-iyengar-demo'),
  },
  {
    slug: 'vikram-shetty',
    name: 'Vikram Shetty',
    initials: 'VS',
    role: 'Cloud Head',
    tier: 'core',
    domain: 'Cloud',
    accent: 'yellow',
    year: '3rd year · ISE',
    bio: 'Deploys things for fun and rolls them back for practice. Makes infrastructure feel less like magic.',
    focus: 'Cloud workshops, deploy clinics and the chapter’s shared infrastructure.',
    skills: ['Containers', 'CI/CD', 'Linux', 'Terraform', 'Go'],
    contributions: [
      'Runs “Cloud. Code. Deploy.” and monthly deploy clinics',
      'Set up preview deploys for every chapter repo',
      'Gave the “Kubernetes in an hour” talk',
    ],
    repos: [
      repo('vikram-shetty-demo', 'deploy-starter', 'A starter app with a working pipeline from day one.', 'Go'),
      repo('vikram-shetty-demo', 'infra-notes', 'Plain-language notes on cloud building blocks.', 'Markdown'),
    ],
    github: gh('vikram-shetty-demo'),
    linkedin: li('vikram-shetty-demo'),
  },

  // Junior core
  {
    slug: 'sneha-kulkarni',
    name: 'Sneha Kulkarni',
    initials: 'SK',
    role: 'Junior Core · Dev',
    tier: 'junior',
    domain: 'Dev',
    accent: 'green',
    year: '2nd year · CSE',
    bio: 'Frontend-curious and always testing on the oldest phone in the room.',
    skills: ['React', 'CSS', 'PWAs', 'Testing'],
    contributions: ['Co-instructor for the installable web apps lab', 'Built the events filter on this site'],
    repos: [repo('sneha-k-demo', 'offline-notes', 'An offline-first notes PWA.', 'TypeScript')],
    github: gh('sneha-k-demo'),
    linkedin: li('sneha-k-demo'),
  },
  {
    slug: 'nikhil-bhat',
    name: 'Nikhil Bhat',
    initials: 'NB',
    role: 'Junior Core · Dev',
    tier: 'junior',
    domain: 'Dev',
    accent: 'blue',
    year: '2nd year · ECE',
    bio: 'Android dev who thinks every app should have a dark mode on day one.',
    skills: ['Kotlin', 'Jetpack Compose', 'Material Design', 'Firebase'],
    contributions: ['Leading the upcoming Compose Camp', 'Built a habit-tracker sample app for workshops'],
    repos: [repo('nikhil-bhat-demo', 'habit-compose', 'Habit tracker built with Compose.', 'Kotlin')],
    github: gh('nikhil-bhat-demo'),
    linkedin: li('nikhil-bhat-demo'),
  },
  {
    slug: 'aditya-joshi',
    name: 'Aditya Joshi',
    initials: 'AJ',
    role: 'Junior Core · CP',
    tier: 'junior',
    domain: 'CP',
    accent: 'red',
    year: '2nd year · CSE',
    bio: 'Writes editorials longer than the solutions. Loves a clean greedy proof.',
    skills: ['C++', 'Number theory', 'Greedy algorithms', 'Technical writing'],
    contributions: ['Writes weekly ladder editorials', 'Tested problems for the internal contest'],
    repos: [repo('aditya-joshi-demo', 'editorials', 'Plain-English editorials for practice problems.', 'Markdown')],
    github: gh('aditya-joshi-demo'),
    linkedin: li('aditya-joshi-demo'),
  },
  {
    slug: 'riya-shenoy',
    name: 'Riya Shenoy',
    initials: 'RS',
    role: 'Junior Core · Design',
    tier: 'junior',
    domain: 'Design',
    accent: 'yellow',
    year: '2nd year · ISE',
    bio: 'Turns event ideas into posters, and posters into tiny animations.',
    skills: ['Figma', 'After Effects', 'Typography', 'Illustration'],
    contributions: ['Designed event frames for the recap gallery', 'Animated the chapter’s social intros'],
    repos: [repo('riya-shenoy-demo', 'poster-kit', 'Reusable poster templates for chapter events.', 'Figma')],
    github: gh('riya-shenoy-demo'),
    linkedin: li('riya-shenoy-demo'),
  },
  {
    slug: 'harsh-patil',
    name: 'Harsh Patil',
    initials: 'HP',
    role: 'Junior Core · AI/ML',
    tier: 'junior',
    domain: 'AI/ML',
    accent: 'red',
    year: '2nd year · AIML',
    bio: 'Runs experiments, keeps notes, and is suspicious of any accuracy above 99%.',
    skills: ['Python', 'scikit-learn', 'Experiment tracking', 'Pandas'],
    contributions: ['Prepared starter notebooks for Build with AI', 'Co-runs the paper reading group'],
    repos: [repo('harsh-patil-demo', 'eval-notebooks', 'Notebooks on evaluating small models honestly.', 'Python')],
    github: gh('harsh-patil-demo'),
    linkedin: li('harsh-patil-demo'),
  },
  {
    slug: 'ishita-rao',
    name: 'Ishita Rao',
    initials: 'IR',
    role: 'Junior Core · Cloud',
    tier: 'junior',
    domain: 'Cloud',
    accent: 'green',
    year: '2nd year · CSE',
    bio: 'Automates anything she has to do twice. Pipelines are her love language.',
    skills: ['GitHub Actions', 'Docker', 'Bash', 'Monitoring'],
    contributions: ['Co-instructor for the deploy pipeline session', 'Wrote the chapter’s CI templates'],
    repos: [repo('ishita-rao-demo', 'ci-templates', 'Copy-paste CI templates for student projects.', 'YAML')],
    github: gh('ishita-rao-demo'),
    linkedin: li('ishita-rao-demo'),
  },

  // Members
  {
    slug: 'pranav-reddy',
    name: 'Pranav Reddy',
    initials: 'PR',
    role: 'Member · Dev',
    tier: 'member',
    domain: 'Dev',
    accent: 'green',
    year: '1st year · CSE',
    bio: 'Shipped his first pull request at a chapter event.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    contributions: ['Fixed footer link styles on this site', 'Volunteer at Build Weekend'],
    github: gh('pranav-reddy-demo'),
    linkedin: li('pranav-reddy-demo'),
  },
  {
    slug: 'aisha-khan',
    name: 'Aisha Khan',
    initials: 'AK',
    role: 'Member · Design',
    tier: 'member',
    domain: 'Design',
    accent: 'yellow',
    year: '1st year · ECE',
    bio: 'Sketches interfaces on the back of lab manuals.',
    skills: ['Figma', 'Sketching'],
    contributions: ['Designed stickers for the Build with AI workshop'],
    github: gh('aisha-khan-demo'),
    linkedin: li('aisha-khan-demo'),
  },
  {
    slug: 'karthik-s',
    name: 'Karthik S',
    initials: 'KS',
    role: 'Member · CP',
    tier: 'member',
    domain: 'CP',
    accent: 'red',
    year: '1st year · ISE',
    bio: 'Climbing the practice ladder one rung a week.',
    skills: ['C++', 'Python'],
    contributions: ['Top-5 finish on the internal contest', 'Proof-read three editorials'],
    github: gh('karthik-s-demo'),
    linkedin: li('karthik-s-demo'),
  },
  {
    slug: 'meghana-gowda',
    name: 'Meghana Gowda',
    initials: 'MG',
    role: 'Member · AI/ML',
    tier: 'member',
    domain: 'AI/ML',
    accent: 'blue',
    year: '2nd year · AIML',
    bio: 'Curious about models that run on tiny devices.',
    skills: ['Python', 'TensorFlow Lite'],
    contributions: ['Presented a lightning talk on on-device ML'],
    github: gh('meghana-gowda-demo'),
    linkedin: li('meghana-gowda-demo'),
  },
  {
    slug: 'rahul-varma',
    name: 'Rahul Varma',
    initials: 'RV',
    role: 'Member · Cloud',
    tier: 'member',
    domain: 'Cloud',
    accent: 'yellow',
    year: '1st year · CSE',
    bio: 'Has deployed the same to-do app to four different clouds.',
    skills: ['Linux', 'Docker'],
    contributions: ['Helped run setup support at the deploy clinic'],
    github: gh('rahul-varma-demo'),
    linkedin: li('rahul-varma-demo'),
  },
  {
    slug: 'zoya-fernandes',
    name: 'Zoya Fernandes',
    initials: 'ZF',
    role: 'Member · Dev',
    tier: 'member',
    domain: 'Dev',
    accent: 'blue',
    year: '1st year · ECE',
    bio: 'Learning React by rebuilding every app on her phone.',
    skills: ['React', 'Tailwind CSS'],
    contributions: ['Built the first draft of the team page cards'],
    github: gh('zoya-fernandes-demo'),
    linkedin: li('zoya-fernandes-demo'),
  },
]

export const ROLE_FILTERS = ['All', 'Core', 'Dev', 'CP', 'Design', 'AI/ML', 'Cloud'] as const
export type RoleFilter = (typeof ROLE_FILTERS)[number]

export const TIER_SECTIONS: { tier: Tier; index: string; label: string; title: string; note: string }[] = [
  { tier: 'lead', index: '01', label: 'Leadership', title: 'Steering the chapter.', note: 'Sets direction and keeps every vertical moving.' },
  { tier: 'core', index: '02', label: 'Core team · vertical heads', title: 'One head per craft.', note: 'Each vertical head runs workshops, reviews and projects in their domain.' },
  { tier: 'junior', index: '03', label: 'Junior core', title: 'Next up, already shipping.', note: 'Second-years who co-run sessions and own real pieces of the chapter.' },
  { tier: 'member', index: '04', label: 'Members', title: 'Where it all starts.', note: 'Contributors who show up, build and help out.' },
]

export const isClickable = (m: Member) => m.tier !== 'member'
