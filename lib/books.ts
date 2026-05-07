export type Quote = {
  text: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  quotes: Quote[];
};

export const books: Book[] = [
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    quotes: [
      { text: 'Because the desert tests all men.' },
      {
        text: 'Show me where there is life out in the desert. Only those who can see such signs of life are able to find treasure.',
      },
      {
        text: "Every search begins with beginner's luck. And every search ends with the victor's being severely tested.",
      },
    ],
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    quotes: [
      {
        text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
      },
      {
        text: 'Every action you take is a vote for the type of person you wish to become.',
      },
    ],
  },
  {
    id: 'handbuch-des-kriegers',
    title: 'Handbuch des Kriegers',
    author: 'Carlos Castaneda',
    quotes: [
      {
        text: 'Der Krieger behandelt alles mit Respekt und hört auf nichts und niemanden.',
      },
      { text: 'Ein Krieger des Lichts schiebt seine Entscheidungen nicht auf.' },
      {
        text: 'Du bist nur ein Werkzeug des Lichts. Es gibt für dich weder einen Grund, dich zu brüsten, noch einen dafür, dich zu schämen. Es gibt nur einen Grund zur Freude.',
      },
      {
        text: 'Ein Krieger des Lichts teilt seine Welt mit den Menschen, die er liebt.',
      },
    ],
  },
  {
    id: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    quotes: [
      {
        text: 'Nothing in life is as important as you think it is while you are thinking about it.',
      },
      { text: 'We are prone to overestimate how much we understand about the world.' },
    ],
  },
  {
    id: '7-wege',
    title: '7 Wege zur Effektivität',
    author: 'Stephen R. Covey',
    quotes: [
      { text: 'Beginne mit dem Ende im Sinn.' },
      { text: 'Das Wichtigste ist, das Wichtigste wichtig zu lassen.' },
    ],
  },
  {
    id: '11-ist-freundlich',
    title: '11 ist freundlich und 5 ist laut',
    author: 'Rüdiger Maas',
    quotes: [
      { text: 'Wir lernen nicht trotz unserer Unterschiede — sondern durch sie.' },
      { text: 'Jede Generation trägt ihre eigene Logik in sich.' },
    ],
  },
];
