// ---------------------------------------------------------------------------
// HOMORA sample data (frontend only)
// All photography is loaded from Unsplash (https://unsplash.com/license).
// To swap a photo, replace its Unsplash photo id below — every image on the
// site reads from this one file.
// ---------------------------------------------------------------------------

export const unsplash = (id, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

// Used only if an image fails to load.
export const FALLBACK_PHOTOS = ['1600585154340-be6161a56a0c', '1600210492486-724fe5c67fb0'];

export const ROOMS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Exterior'];

export const STYLES = [
  'Modern',
  'Minimalist',
  'Scandinavian',
  'Contemporary',
  'Traditional',
  'Luxury',
  'Industrial',
  'Japandi',
];

const PALETTES = {
  Modern: [
    { name: 'Chalk', hex: '#ECEAE4' },
    { name: 'Graphite', hex: '#3B3B39' },
    { name: 'Walnut', hex: '#6B4E3A' },
  ],
  Minimalist: [
    { name: 'Ivory', hex: '#F4F1EA' },
    { name: 'Oat', hex: '#D9CFBF' },
    { name: 'Ash', hex: '#9C978E' },
  ],
  Scandinavian: [
    { name: 'Birch', hex: '#E8DCC6' },
    { name: 'Fog', hex: '#C9CCC7' },
    { name: 'Sage', hex: '#9AA58C' },
  ],
  Contemporary: [
    { name: 'Sand', hex: '#D8C7AE' },
    { name: 'Olive', hex: '#6E7155' },
    { name: 'Smoke', hex: '#4A4844' },
  ],
  Traditional: [
    { name: 'Cream', hex: '#EFE6D3' },
    { name: 'Moss', hex: '#5E6448' },
    { name: 'Mahogany', hex: '#5A3326' },
  ],
  Luxury: [
    { name: 'Travertine', hex: '#E2D3BC' },
    { name: 'Brass', hex: '#B08D57' },
    { name: 'Onyx', hex: '#262522' },
  ],
  Industrial: [
    { name: 'Concrete', hex: '#A9A6A0' },
    { name: 'Rust', hex: '#8A4F33' },
    { name: 'Steel', hex: '#3F4246' },
  ],
  Japandi: [
    { name: 'Rice paper', hex: '#F1EBDF' },
    { name: 'Hinoki', hex: '#C8A97E' },
    { name: 'Sumi', hex: '#2F2D2A' },
  ],
};

const make = (d) => ({ palette: PALETTES[d.style], ...d });

// ---------------------------------------------------------------------------
// Hero slides
// ---------------------------------------------------------------------------
export const heroSlides = [
  {
    id: 'hero-1',
    photo: '1600210492486-724fe5c67fb0',
    alt: 'Bright contemporary living room with a low sofa and large windows',
    title: 'A Home That Reflects You.',
    description: 'Discover beautiful spaces designed around the way you live.',
    cta: 'Explore Designs',
    target: '#explore',
    label: 'Living',
  },
  {
    id: 'hero-2',
    photo: '1600607687939-ce8a6c25118c',
    alt: 'Open-plan interior with warm timber, stone and soft daylight',
    title: 'Where Comfort Meets Design.',
    description: 'Experience the beauty of thoughtful interiors.',
    cta: 'Discover Interiors',
    target: '#showcase',
    label: 'Interiors',
  },
  {
    id: 'hero-3',
    photo: '1600585154340-be6161a56a0c',
    alt: 'Modern house with a pool and floor-to-ceiling glass at dusk',
    title: 'Your Dream Space Starts Here.',
    description: 'Find inspiration for every corner of your home.',
    cta: 'View Collections',
    target: '#styles',
    label: 'Collections',
  },
];

// ---------------------------------------------------------------------------
// Room categories
// ---------------------------------------------------------------------------
export const roomCategories = [
  {
    room: 'Living Room',
    photo: '1618221195710-dd6b41faaea6',
    alt: 'Living room with a soft neutral sofa, side table and framed art',
    description: 'Gathering rooms built around light, conversation and the long afternoon.',
  },
  {
    room: 'Bedroom',
    photo: '1616594039964-ae9021a400a0',
    alt: 'Calm bedroom with layered linen bedding and warm lamp light',
    description: 'Quiet, tactile retreats where every surface invites you to slow down.',
  },
  {
    room: 'Kitchen',
    photo: '1556909114-f6e7ad7d3136',
    alt: 'Modern kitchen with an island, pendant lights and pale cabinetry',
    description: 'Hard-working kitchens with honest materials and room to cook together.',
  },
  {
    room: 'Bathroom',
    photo: '1552321554-5fefe8c9ef14',
    alt: 'Serene bathroom with a freestanding tub and natural stone',
    description: 'Spa-like bathrooms in stone, timber and soft, diffused light.',
  },
];

// ---------------------------------------------------------------------------
// Featured showcase (pinned scroll section)
// ---------------------------------------------------------------------------
export const showcases = [
  make({
    id: 'showcase-contemporary-living',
    title: 'Contemporary Living',
    room: 'Living Room',
    style: 'Contemporary',
    photo: '1616486338812-3dadae4b4ace',
    ratio: 'landscape',
    area: '64 m²',
    studio: 'Studio Alder (sample)',
    materials: ['Bouclé upholstery', 'Smoked oak', 'Limewash walls'],
    description:
      'A light-filled lounge layered in sand, oat and olive. Low seating keeps sightlines open to the garden, while a single sculptural lamp sets the evening mood.',
  }),
  make({
    id: 'showcase-minimalist-bedroom',
    title: 'Minimalist Bedroom',
    room: 'Bedroom',
    style: 'Minimalist',
    photo: '1505693416388-ac5ce068fe85',
    ratio: 'landscape',
    area: '22 m²',
    studio: 'Maison Calme (sample)',
    materials: ['Stonewashed linen', 'White oak', 'Lime plaster'],
    description:
      'Nothing extra, nothing missing. A floating bed, concealed storage and a palette of soft whites let morning light do all of the decorating.',
  }),
  make({
    id: 'showcase-modern-kitchen',
    title: 'Modern Kitchen',
    room: 'Kitchen',
    style: 'Modern',
    photo: '1600566753086-00f18fb6b3ea',
    ratio: 'landscape',
    area: '31 m²',
    studio: 'Form & Hearth (sample)',
    materials: ['Honed quartzite', 'Matte lacquer', 'Brushed steel'],
    description:
      'A long island anchors this open kitchen. Handleless cabinetry, a single stone surface and warm under-shelf lighting keep the room calm even on busy nights.',
  }),
];

// ---------------------------------------------------------------------------
// Style explorer cover images
// ---------------------------------------------------------------------------
export const styleCollections = [
  { name: 'Modern', photo: '1600596542815-ffad4c1539a9', blurb: 'Clean geometry, open plans and honest materials.' },
  { name: 'Minimalist', photo: '1600585154526-990dced4db0d', blurb: 'Only what matters: light, proportion and calm.' },
  { name: 'Scandinavian', photo: '1586023492125-27b2c045efd7', blurb: 'Pale timber, soft textiles and everyday warmth.' },
  { name: 'Contemporary', photo: '1600607687644-c7171b42498f', blurb: 'Curved forms, tonal layers and relaxed luxury.' },
  { name: 'Traditional', photo: '1583847268964-b28dc8f51f92', blurb: 'Mouldings, heirlooms and timeless symmetry.' },
  { name: 'Luxury', photo: '1613490493576-7fde63acd811', blurb: 'Stone, brass and generous, hotel-like comfort.' },
  { name: 'Industrial', photo: '1524758631624-e2822e304c36', blurb: 'Raw concrete, steel frames and loft-scale volume.' },
  { name: 'Japandi', photo: '1617806118233-18e1de247200', blurb: 'Japanese restraint meets Nordic softness.' },
];

// ---------------------------------------------------------------------------
// Inspiration gallery designs
// ---------------------------------------------------------------------------
export const designs = [
  make({
    id: 'd01', title: 'Sunlit Linen Lounge', room: 'Living Room', style: 'Scandinavian',
    photo: '1493809842364-78817add7ffb', ratio: 'portrait', area: '38 m²', studio: 'Atelier Nord (sample)',
    materials: ['Washed linen', 'Ash wood', 'Wool rug'],
    description: 'A soft, airy lounge where pale timber and washed linen meet tall windows and trailing plants.',
  }),
  make({
    id: 'd02', title: 'Stone & Oak Kitchen', room: 'Kitchen', style: 'Modern',
    photo: '1484154218962-a197022b5858', ratio: 'landscape', area: '26 m²', studio: 'Form & Hearth (sample)',
    materials: ['Oak veneer', 'Honed marble', 'Black steel'],
    description: 'Warm oak fronts and a honed stone worktop balance crisp modern lines with a lived-in feel.',
  }),
  make({
    id: 'd03', title: 'Quiet Morning Suite', room: 'Bedroom', style: 'Minimalist',
    photo: '1522771739844-6a9f6d5f14af', ratio: 'tall', area: '19 m²', studio: 'Maison Calme (sample)',
    materials: ['Cotton percale', 'Rattan', 'Whitewashed pine'],
    description: 'A pared-back bedroom in layered whites, designed for slow mornings and deep sleep.',
  }),
  make({
    id: 'd04', title: 'Travertine Retreat', room: 'Bathroom', style: 'Luxury',
    photo: '1584622650111-993a426fbf0a', ratio: 'square', area: '14 m²', studio: 'Casa Pietra (sample)',
    materials: ['Travertine', 'Brushed brass', 'Fluted glass'],
    description: 'Book-matched stone and warm brass turn a daily routine into a quiet ritual.',
  }),
  make({
    id: 'd05', title: 'Courtyard Pavilion', room: 'Exterior', style: 'Modern',
    photo: '1600047509807-ba8f99d2cdde', ratio: 'landscape', area: '240 m²', studio: 'Studio Alder (sample)',
    materials: ['Board-formed concrete', 'Cedar cladding', 'Steel glazing'],
    description: 'A low, horizontal home organised around a planted courtyard and long views.',
  }),
  make({
    id: 'd06', title: 'Gallery Living Room', room: 'Living Room', style: 'Contemporary',
    photo: '1600607688969-a5bfcd646154', ratio: 'portrait', area: '52 m²', studio: 'Atelier Ombre (sample)',
    materials: ['Velvet', 'Travertine', 'Smoked glass'],
    description: 'Curated art and sculptural seating make this living room feel like a private gallery.',
  }),
  make({
    id: 'd07', title: 'Olive Grove Kitchen', room: 'Kitchen', style: 'Traditional',
    photo: '1556228453-efd6c1ff04f6', ratio: 'tall', area: '24 m²', studio: 'House of Thyme (sample)',
    materials: ['Painted shaker doors', 'Zellige tile', 'Aged brass'],
    description: 'Shaker cabinetry in muted green with hand-glazed tile and a generous farmhouse sink.',
  }),
  make({
    id: 'd08', title: 'Hotel-Inspired Bedroom', room: 'Bedroom', style: 'Luxury',
    photo: '1631049307264-da0ec9d70304', ratio: 'landscape', area: '28 m²', studio: 'Casa Pietra (sample)',
    materials: ['Upholstered headboard', 'Silk blend', 'Walnut'],
    description: 'A tailored headboard, bedside sconces and layered textiles bring boutique-hotel calm home.',
  }),
  make({
    id: 'd09', title: 'Soft Loft', room: 'Living Room', style: 'Industrial',
    photo: '1502672260266-1c1ef2d93688', ratio: 'square', area: '58 m²', studio: 'Foundry Works (sample)',
    materials: ['Polished concrete', 'Leather', 'Crittall-style glazing'],
    description: 'Tall ceilings and exposed structure softened with leather, rugs and warm lamplight.',
  }),
  make({
    id: 'd10', title: 'Washi Light Bedroom', room: 'Bedroom', style: 'Japandi',
    photo: '1540518614846-7eded433c457', ratio: 'portrait', area: '17 m²', studio: 'Kumo Studio (sample)',
    materials: ['Paper lanterns', 'Hinoki', 'Linen'],
    description: 'Low furniture, diffused light and natural fibres create a bedroom of complete stillness.',
  }),
  make({
    id: 'd11', title: 'Cliffside Villa', room: 'Exterior', style: 'Luxury',
    photo: '1512917774080-9991f1c4c750', ratio: 'landscape', area: '410 m²', studio: 'Studio Alder (sample)',
    materials: ['Limestone', 'Bronze frames', 'Infinity pool'],
    description: 'Layered terraces step down toward the view, with indoor rooms opening fully to the air.',
  }),
  make({
    id: 'd12', title: 'Monochrome Bath', room: 'Bathroom', style: 'Minimalist',
    photo: '1620626011761-996317b8d101', ratio: 'tall', area: '9 m²', studio: 'Maison Calme (sample)',
    materials: ['Microcement', 'Matte black fittings', 'Oak shelf'],
    description: 'Seamless microcement walls and a single timber shelf keep this compact bathroom serene.',
  }),
  make({
    id: 'd13', title: 'Bouclé Corner', room: 'Living Room', style: 'Minimalist',
    photo: '1555041469-a586c61ea9bc', ratio: 'landscape', area: '33 m²', studio: 'Atelier Nord (sample)',
    materials: ['Bouclé', 'Pale oak', 'Lime paint'],
    description: 'One generous sofa, one rug, one lamp. A study in restraint that still feels warm.',
  }),
  make({
    id: 'd14', title: "Chef's Island", room: 'Kitchen', style: 'Contemporary',
    photo: '1556911220-bff31c812dba', ratio: 'portrait', area: '35 m²', studio: 'Form & Hearth (sample)',
    materials: ['Quartzite', 'Fluted oak', 'Bronze pendants'],
    description: 'A sculpted island with seating for four turns the kitchen into the heart of the home.',
  }),
  make({
    id: 'd15', title: 'Garden House', room: 'Exterior', style: 'Contemporary',
    photo: '1564013799919-ab600027ffc6', ratio: 'square', area: '280 m²', studio: 'Atelier Ombre (sample)',
    materials: ['Render', 'Timber decking', 'Large-format glass'],
    description: 'A family home that opens onto a lush garden through wide sliding glass walls.',
  }),
  make({
    id: 'd16', title: 'Heritage Parlour', room: 'Living Room', style: 'Traditional',
    photo: '1618220179428-22790b461013', ratio: 'tall', area: '41 m²', studio: 'House of Thyme (sample)',
    materials: ['Panelled walls', 'Antique rug', 'Linen drapery'],
    description: 'Period details and collected pieces give this sitting room a gentle, timeless character.',
  }),
  make({
    id: 'd17', title: 'Nordic Daybed Room', room: 'Bedroom', style: 'Scandinavian',
    photo: '1586105251261-72a756497a11', ratio: 'landscape', area: '16 m²', studio: 'Atelier Nord (sample)',
    materials: ['Birch ply', 'Wool throw', 'Cotton'],
    description: 'Simple birch furniture and layered textiles make a cosy, flexible guest bedroom.',
  }),
  make({
    id: 'd18', title: 'Spa Wet Room', room: 'Bathroom', style: 'Japandi',
    photo: '1600566753376-12c8ab7fb75b', ratio: 'portrait', area: '11 m²', studio: 'Kumo Studio (sample)',
    materials: ['Slate', 'Teak bench', 'Rain shower'],
    description: 'An open wet room with a teak bench and slate floor, inspired by Japanese bathhouses.',
  }),
  make({
    id: 'd19', title: 'Brick & Steel Kitchen', room: 'Kitchen', style: 'Industrial',
    photo: '1600121848594-d8644e57abab', ratio: 'square', area: '29 m²', studio: 'Foundry Works (sample)',
    materials: ['Reclaimed brick', 'Stainless steel', 'Oak butcher block'],
    description: 'Open shelving, steel and reclaimed brick give this kitchen a workshop sensibility.',
  }),
  make({
    id: 'd20', title: 'White Cube Residence', room: 'Exterior', style: 'Minimalist',
    photo: '1580587771525-78b9dba3b914', ratio: 'landscape', area: '320 m²', studio: 'Maison Calme (sample)',
    materials: ['White render', 'Glass balustrade', 'Stone paving'],
    description: 'Pure white volumes and deep shadows give this residence a quiet, sculptural presence.',
  }),
  make({
    id: 'd21', title: 'Paper Lantern Lounge', room: 'Living Room', style: 'Japandi',
    photo: '1567016432779-094069958ea5', ratio: 'portrait', area: '36 m²', studio: 'Kumo Studio (sample)',
    materials: ['Paper', 'Ash', 'Jute'],
    description: 'A low-slung sofa, natural fibres and soft paper light create an unhurried living space.',
  }),
  make({
    id: 'd22', title: 'Pale Ash Living', room: 'Living Room', style: 'Scandinavian',
    photo: '1507089947368-19c1da9775ae', ratio: 'tall', area: '44 m²', studio: 'Atelier Nord (sample)',
    materials: ['Ash', 'Felted wool', 'Ceramic'],
    description: 'Bright, practical and calm: a family living room built around pale ash and soft wool.',
  }),
  make({
    id: 'd23', title: 'Velvet Night Bedroom', room: 'Bedroom', style: 'Contemporary',
    photo: '1615874959474-d609969a20ed', ratio: 'square', area: '24 m²', studio: 'Atelier Ombre (sample)',
    materials: ['Velvet', 'Smoked oak', 'Brass sconces'],
    description: 'Deep tones and plush textures make an enveloping bedroom for winding down.',
  }),
  make({
    id: 'd24', title: 'Classic Clawfoot Bath', room: 'Bathroom', style: 'Traditional',
    photo: '1564078516393-cf04bd966897', ratio: 'landscape', area: '13 m²', studio: 'House of Thyme (sample)',
    materials: ['Cast iron', 'Marble mosaic', 'Nickel taps'],
    description: 'A freestanding tub, panelled walls and marble mosaic floors with old-world charm.',
  }),
  make({
    id: 'd25', title: 'Warehouse Bedroom', room: 'Bedroom', style: 'Industrial',
    photo: '1595526114035-0d45ed16cfbf', ratio: 'portrait', area: '27 m²', studio: 'Foundry Works (sample)',
    materials: ['Exposed brick', 'Blackened steel', 'Linen'],
    description: 'Raw walls and steel framing meet soft bedding in this converted-warehouse bedroom.',
  }),
  make({
    id: 'd26', title: 'Concrete Bath', room: 'Bathroom', style: 'Industrial',
    photo: '1600494603989-9650cf6ddd3d', ratio: 'tall', area: '10 m²', studio: 'Foundry Works (sample)',
    materials: ['Cast concrete', 'Gunmetal fittings', 'Wired glass'],
    description: 'A cast-concrete basin and gunmetal fittings bring an industrial edge to a small bath.',
  }),
  make({
    id: 'd27', title: 'Glasshouse Living', room: 'Living Room', style: 'Modern',
    photo: '1600585152220-90363fe7e115', ratio: 'square', area: '62 m²', studio: 'Studio Alder (sample)',
    materials: ['Terrazzo', 'Walnut', 'Steel-framed glass'],
    description: 'Floor-to-ceiling glazing turns the landscape into the main feature of the room.',
  }),
];

// Everything that can be searched or opened in the detail view.
export const allDesigns = [...showcases, ...designs];
