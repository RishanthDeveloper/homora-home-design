// Illustrative content only: these testimonials, names and locations are
// fictional samples written for this demo website.
const avatar = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&h=200&q=80&crop=faces`;

export const testimonials = [
  {
    id: 't1',
    name: 'Amara Okafor',
    location: 'Lisbon, Portugal',
    project: 'Living room refresh',
    avatar: avatar('1494790108377-be9c29b29330'),
    quote:
      'I saved a dozen living rooms, then noticed they all shared the same low sofas and limewashed walls. That pattern became our brief, and the room finally feels like us.',
  },
  {
    id: 't2',
    name: 'Daniel Whitmore',
    location: 'Copenhagen, Denmark',
    project: 'Kitchen renovation',
    avatar: avatar('1507003211169-0a1dd7228f2d'),
    quote:
      'Filtering by style helped us agree on a direction in one evening. We walked into our first meeting with the joiner holding a clear, shared picture.',
  },
  {
    id: 't3',
    name: 'Priya Raman',
    location: 'Bengaluru, India',
    project: 'Japandi bedroom',
    avatar: avatar('1438761681033-6461ffad8d80'),
    quote:
      'The Japandi collection gave words to something I had felt for years. Paper light, low furniture, fewer things. Our bedroom is now the calmest room in the house.',
  },
  {
    id: 't4',
    name: 'Lucas Moreau',
    location: 'Lyon, France',
    project: 'Bathroom remodel',
    avatar: avatar('1500648767791-00dcc994a43e'),
    quote:
      'I kept coming back to the travertine retreat. Seeing the materials named alongside the photo made it easy to source a version that suited our budget.',
  },
];
