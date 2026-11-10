// ---------------------------------------------------------------------------
// HOMORA sample data (frontend only)
// All photography is loaded from Unsplash (https://unsplash.com/license).
// To swap a photo, replace its Unsplash photo id below — every image on the
// site reads from this one file.
// ---------------------------------------------------------------------------

export const unsplash = (id, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

// Used only if an image fails to load.
export const FALLBACK_PHOTOS = ['1758448511322-8bfc73daf606', '1616486029423-aaa4789e8c9a'];

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
    alt: 'Bright kitchen with open timber shelves and home cooks preparing food',
    description: 'Welcoming kitchens with timber open shelving, a gas range and room to cook together.',
  },
  {
    room: 'Bathroom',
    photo: '1552321554-5fefe8c9ef14',
    alt: 'White bathroom with a pedestal sink, checkerboard floor and window',
    description: 'Airy bathrooms with black-and-white checkerboard tile, natural daylight and greenery.',
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
    area: '42 m²',
    materials: ['Beige fabric upholstery', 'Round oak coffee table', 'Woven wall decor', 'Neutral area rug'],
    description:
      'A neutral living room arranged around a low beige sectional sofa, a round wooden coffee table and a gallery wall with woven plates and an oversized wall clock.',
  }),
  make({
    id: 'showcase-minimalist-bedroom',
    title: 'Minimalist Bedroom',
    room: 'Bedroom',
    style: 'Minimalist',
    photo: '1505693416388-ac5ce068fe85',
    ratio: 'landscape',
    area: '28 m²',
    materials: ['Tufted headboard', 'Mirrored bedside chests', 'Upholstered bench', 'Textured coverlet'],
    description:
      'A spacious bedroom centered on a tufted wingback headboard, matching foot bench, mirrored nightstands and tall draped windows.',
  }),
  make({
    id: 'showcase-modern-kitchen',
    title: 'Modern Kitchen',
    room: 'Kitchen',
    style: 'Modern',
    photo: '1602028667128-a6cb1b40190d',
    ratio: 'landscape',
    area: '32 m²',
    materials: ['White quartz island', 'Glass pendant lights', 'Leather counter stools', 'White cabinetry'],
    description:
      'A wide white quartz kitchen island with an undermount sink, four black leather barstools and three teardrop glass pendants against white perimeter cabinets.',
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
    id: 'd01',
    title: 'Sunlit Parquet Lounge',
    room: 'Living Room',
    style: 'Scandinavian',
    photo: '1493809842364-78817add7ffb',
    ratio: 'portrait',
    area: '26 m²',
    materials: ['Herringbone oak parquet', 'Cobalt blue sofa', 'White credenza', 'Eames-style rocker'],
    description:
      'Natural daylight pours across herringbone oak floors onto a deep blue sofa, a white media unit and an armchair lined with sheepskin.',
  }),
  make({
    id: 'd02',
    title: 'Black & White Kitchen',
    room: 'Kitchen',
    style: 'Modern',
    photo: '1484154218962-a197022b5858',
    ratio: 'landscape',
    area: '24 m²',
    materials: ['White quartz countertop', 'Black subway tile', 'Stainless steel appliances', 'Black metal pendants'],
    description:
      'Crisp white flat-front cabinets and a waterfall island contrast with a glossy black subway tile backsplash and twin dome pendant lights.',
  }),
  make({
    id: 'd03',
    title: 'Quiet Morning Bedroom',
    room: 'Bedroom',
    style: 'Minimalist',
    photo: '1522771739844-6a9f6d5f14af',
    ratio: 'tall',
    area: '18 m²',
    materials: ['Linen duvet', 'Oak nightstand', 'Glass table lamp', 'Grey carpet'],
    description:
      'A white linen-dressed bed with indigo accent pillows sits beside a two-tone oak nightstand and a glass cylinder table lamp.',
  }),
  make({
    id: 'd04',
    title: 'Charcoal & Quartz Bath',
    room: 'Bathroom',
    style: 'Luxury',
    photo: '1584622650111-993a426fbf0a',
    ratio: 'square',
    area: '15 m²',
    materials: ['White quartz countertop', 'Matte black hardware', 'Glass shower enclosure', 'Timber mirror frame'],
    description:
      'A charcoal double vanity with white undermount basins and matte black faucets stands opposite a walk-in glass shower stall.',
  }),
  make({
    id: 'd05',
    title: 'Cedar Clad Residence',
    room: 'Exterior',
    style: 'Modern',
    photo: '1600047509807-ba8f99d2cdde',
    ratio: 'landscape',
    area: '260 m²',
    materials: ['Timber cladding', 'White stucco', 'Concrete pavers', 'Steel window frames'],
    description:
      'A two-level home with a warm cedar upper box, white rendered walls and square concrete stepping stones across a front lawn.',
  }),
  make({
    id: 'd06',
    title: 'Gallery Living Room',
    room: 'Living Room',
    style: 'Contemporary',
    photo: '1758957701419-2c6e266f7988',
    ratio: 'portrait',
    area: '48 m²',
    materials: ['Concrete feature wall', 'Live-edge wood table', 'White sectional sofa', 'Abstract canvas art'],
    description:
      'A wide white sectional sofa and live-edge wooden coffee table sit before a tall concrete panel wall hung with monochrome abstract art.',
  }),
  make({
    id: 'd07',
    title: 'Warm Shaker Kitchen',
    room: 'Kitchen',
    style: 'Traditional',
    photo: '1613685303322-269e3144fc64',
    ratio: 'tall',
    area: '28 m²',
    materials: ['Cream shaker cabinets', 'Cane counter stools', 'Brass lantern pendants', 'Fan tile backsplash'],
    description:
      'Off-white shaker cabinetry wraps around a central island with high cane barstools, twin brass lantern pendants and a patterned tile backsplash.',
  }),
  make({
    id: 'd08',
    title: 'Hotel Master Suite',
    room: 'Bedroom',
    style: 'Luxury',
    photo: '1631049307264-da0ec9d70304',
    ratio: 'landscape',
    area: '30 m²',
    materials: ['Channel-tufted headboard', 'Oak bedside table', 'Wool plaid runner', 'Sheer drapery'],
    description:
      'A king bed with a tall grey upholstered headboard, crisp white bedding, a plaid throw and light oak bedside tables overlooking city towers.',
  }),
  make({
    id: 'd09',
    title: 'Mid-Century Studio Lounge',
    room: 'Living Room',
    style: 'Industrial',
    photo: '1502672260266-1c1ef2d93688',
    ratio: 'square',
    area: '22 m²',
    materials: ['Plywood lounge chair', 'Grey upholstered sofa', 'Triangle coffee table', 'Built-in shelving'],
    description:
      'A compact living area with a grey loveseat, molded plywood lounge chair, triangular wood coffee table and bookshelves filled with plants.',
  }),
  make({
    id: 'd10',
    title: 'Slatted Wood Bedroom',
    room: 'Bedroom',
    style: 'Japandi',
    photo: '1699869653495-fe26f4c70b3e',
    ratio: 'portrait',
    area: '20 m²',
    materials: ['Timber slat paneling', 'Low platform bed', 'Paper pendant lights', 'Round wall mirror'],
    description:
      'A low upholstered platform bed rests against a dark slatted timber accent wall with three paper globe pendant lamps and a potted monstera.',
  }),
  make({
    id: 'd11',
    title: 'Poolside Modern Villa',
    room: 'Exterior',
    style: 'Luxury',
    photo: '1512917774080-9991f1c4c750',
    ratio: 'landscape',
    area: '380 m²',
    materials: ['White render', 'Glass sliding doors', 'Tiled pool terrace', 'Palm trees'],
    description:
      'A white cubic villa with an overhanging flat roof opening onto a private swimming pool, outdoor shower and palm trees.',
  }),
  make({
    id: 'd12',
    title: 'Bright Minimalist Bath',
    room: 'Bathroom',
    style: 'Minimalist',
    photo: '1620626011761-996317b8d101',
    ratio: 'tall',
    area: '11 m²',
    materials: ['Ceramic soaking tub', 'Floating vanity', 'Polished chrome tapware', 'Grey floor tiles'],
    description:
      'A freestanding oval soaking tub with a timber caddy sits next to a floating white vanity with an oval vessel basin and tall window.',
  }),
  make({
    id: 'd13',
    title: 'Emerald Velvet Lounge',
    room: 'Living Room',
    style: 'Minimalist',
    photo: '1555041469-a586c61ea9bc',
    ratio: 'landscape',
    area: '26 m²',
    materials: ['Emerald velvet upholstery', 'Tapered oak legs', 'Light oak flooring'],
    description:
      'A tufted mid-century sofa in emerald green velvet with round bolster pillows stands out against plain white walls and oak floorboards.',
  }),
  make({
    id: 'd14',
    title: 'Granite & Gas Island Kitchen',
    room: 'Kitchen',
    style: 'Contemporary',
    photo: '1556911220-bff31c812dba',
    ratio: 'portrait',
    area: '34 m²',
    materials: ['Veined granite island', 'Gas range cooktop', 'White flat-panel cabinets', 'Built-in ovens'],
    description:
      'A large veined grey granite island with a sunken gas cooktop and fresh ingredients sits before flat-panel white wall cabinets.',
  }),
  make({
    id: 'd15',
    title: 'Veranda Garden House',
    room: 'Exterior',
    style: 'Contemporary',
    photo: '1564013799919-ab600027ffc6',
    ratio: 'square',
    area: '310 m²',
    materials: ['Timber weatherboard', 'Upper balcony balustrade', 'Swimming pool', 'Stone coping'],
    description:
      'A two-story white weatherboard home with an upper covered balcony, timber side extension and curved pool bordered by palms.',
  }),
  make({
    id: 'd16',
    title: 'Warm Terracotta Sitting Room',
    room: 'Living Room',
    style: 'Traditional',
    photo: '1618220179428-22790b461013',
    ratio: 'tall',
    area: '36 m²',
    materials: ['Ribbed velvet armchair', 'Cane mesh sideboard', 'Round brass planter', 'Textured area rug'],
    description:
      'A rust-orange channel-tufted armchair and white fluted pouf accompany a yellow cane sideboard, round mirror and potted indoor greenery.',
  }),
  make({
    id: 'd17',
    title: 'Backlit Headboard Suite',
    room: 'Bedroom',
    style: 'Scandinavian',
    photo: '1586105251261-72a756497a11',
    ratio: 'landscape',
    area: '22 m²',
    materials: ['Upholstered bed frame', 'Backlit wood ledge', 'Brass swing-arm lamp', 'Framed botanical art'],
    description:
      'A black fabric bed with a golden yellow cushion rests beneath a backlit oak ledge, brass reading sconce and two framed line-drawing prints.',
  }),
  make({
    id: 'd18',
    title: 'Stone Slab Wet Room',
    room: 'Bathroom',
    style: 'Japandi',
    photo: '1726572945292-7bb9ff99b102',
    ratio: 'portrait',
    area: '13 m²',
    materials: ['Large-format stone tile', 'Freestanding soaking tub', 'Woven laundry basket', 'Chrome wall mixer'],
    description:
      'A freestanding white tub against large-format limestone wall tiles with a woven lidded basket and a small leafy indoor plant.',
  }),
  make({
    id: 'd19',
    title: 'Brick & Steel Kitchen',
    room: 'Kitchen',
    style: 'Industrial',
    photo: '1595187139760-5cedf9ab5850',
    ratio: 'square',
    area: '28 m²',
    materials: ['Exposed brick wall', 'Stainless steel shelving', 'Oak butcher block', 'Metal bell pendants'],
    description:
      'An industrial kitchen setup with an exposed brick wall, wall-mounted steel shelving, commercial hood and an oak timber counter with herbs.',
  }),
  make({
    id: 'd20',
    title: 'Cantilevered Terrace Villa',
    room: 'Exterior',
    style: 'Minimalist',
    photo: '1580587771525-78b9dba3b914',
    ratio: 'landscape',
    area: '340 m²',
    materials: ['White cantilevered balconies', 'Floor-to-ceiling glass', 'Turquoise swimming pool', 'Tile sun deck'],
    description:
      'Geometric white balconies and glass walls overlook a long rectangular swimming pool and manicured lawn under an open sky.',
  }),
  make({
    id: 'd21',
    title: 'Rust Velvet Sofa',
    room: 'Living Room',
    style: 'Japandi',
    photo: '1567016432779-094069958ea5',
    ratio: 'portrait',
    area: '25 m²',
    materials: ['Textured rust upholstery', 'Quilted cotton cushion', 'Woven wool rug', 'Tapered wood legs'],
    description:
      'An overhead view of a tailored rust-orange sofa with a pink quilted pillow and a textured cream wool rug on a sage green floor.',
  }),
  make({
    id: 'd22',
    title: 'Pale Ash Living Room',
    room: 'Living Room',
    style: 'Scandinavian',
    photo: '1666585958736-a298a13d0a39',
    ratio: 'tall',
    area: '38 m²',
    materials: ['Grey linen sofa', 'Round coffee table', 'Timber ladder shelf', 'Hardwood flooring'],
    description:
      'Light grey sofas with oak timber trim gather around a white round coffee table, a wooden ladder blanket rack and large windows.',
  }),
  make({
    id: 'd23',
    title: 'Botanical Green Bedroom',
    room: 'Bedroom',
    style: 'Contemporary',
    photo: '1615874959474-d609969a20ed',
    ratio: 'square',
    area: '21 m²',
    materials: ['Sage green bedding', 'Woven rattan pendant', 'Brass wall sconces', 'Framed art prints'],
    description:
      'A cosy bedroom with sage green linens, warm orange accent cushions, a woven dome pendant lamp and trailing houseplants on shelves.',
  }),
  make({
    id: 'd24',
    title: 'Classic Clawfoot Bath',
    room: 'Bathroom',
    style: 'Traditional',
    photo: '1769028715040-16cb345ced84',
    ratio: 'landscape',
    area: '14 m²',
    materials: ['Cast iron clawfoot tub', 'Beadboard wainscoting', 'Wooden bath caddy', 'Timber stool'],
    description:
      'A white cast-iron clawfoot bathtub rests against white beadboard wall paneling with a wooden caddy, candlelight and wood accent stool.',
  }),
  make({
    id: 'd25',
    title: 'Light Monochrome Bedroom',
    room: 'Bedroom',
    style: 'Industrial',
    photo: '1595526114035-0d45ed16cfbf',
    ratio: 'portrait',
    area: '24 m²',
    materials: ['Grey upholstered headboard', 'Dark oak floorboards', 'Brass-framed side table', 'Textured area rug'],
    description:
      'A bright bedroom in white and grey tones with an upholstered headboard, white duvet, black reading chair and metal side table.',
  }),
  make({
    id: 'd26',
    title: 'Blue Marble Wet Room',
    room: 'Bathroom',
    style: 'Industrial',
    photo: '1701251786408-d0320ecaad8d',
    ratio: 'tall',
    area: '16 m²',
    materials: ['Blue veined marble slabs', 'Oval soaking tub', 'Brass washstand frames', 'Wall-mounted brass taps'],
    description:
      'Full-height blue marble slabs cover the walls and floor, framing a freestanding oval tub and dual dark washbasins on brass leg stands.',
  }),
  make({
    id: 'd27',
    title: 'Linen & Fluted Oak Lounge',
    room: 'Living Room',
    style: 'Modern',
    photo: '1768904228330-62196a0171d6',
    ratio: 'square',
    area: '45 m²',
    materials: ['Modular linen sofa', 'Fluted oak paneling', 'Twin sphere pendant lights', 'Plaster finish walls'],
    description:
      'A low-profile modular linen sofa sits between fluted oak columns and plaster walls, illuminated by two spherical pendant lamps.',
  }),
];

// Everything that can be searched or opened in the detail view.
export const allDesigns = [...showcases, ...designs];
