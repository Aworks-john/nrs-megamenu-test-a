// NRS product category tree — derived from master list
// Structure: { name, slug, children?, count? }

const CATEGORIES = [
  {
    name: "Bathroom",
    icon: "shower",
    featured: { title: "Bath Lifts", tag: "Most viewed", placeholder: "bath-lift product shot" },
    children: [
      {
        name: "Bathroom Accessories", children: [
          { name: "Bath Boards" },
          { name: "Bath Steps" },
          { name: "Bathing Comfort" },
          { name: "Grab Rails", children: [
            { name: "Outdoor Grab Rails" }, { name: "Plastic Grab Rails" },
            { name: "Steel Grab Rails" }, { name: "Support Rails" }
          ]},
        ]
      },
      {
        name: "Bath Lifts", children: [
          { name: "Bath Lift Accessories" }, { name: "Fixed Bath Lifts" },
          { name: "Hoist" }, { name: "Inflatable Bath Lifts" },
          { name: "Reclining Bath Lifts" }
        ]
      },
      { name: "Bath Lift Servicing", children: [{ name: "Bath Lift Warranty" }] },
      { name: "Anti Slip", children: [{ name: "Bath/Shower Mats" }] },
      {
        name: "Bathroom Seating", children: [
          { name: "Bathroom Benches & Chairs" },
          { name: "Shower Chairs", children: [
            { name: "Mobile Shower Chairs" }, { name: "Static Shower Chairs" }, { name: "TIS Shower Chairs" }
          ]},
          { name: "Bathroom Stools", children: [
            { name: "Rotating Bathroom Stools" }, { name: "Static Bathroom Stools" }
          ]},
        ]
      },
      {
        name: "Toilet Aids", children: [
          { name: "Commodes", children: [
            { name: "Chemical Commodes" }, { name: "Commode Pots/Liners" },
            { name: "Folding Commodes" }, { name: "Mobile Commodes" },
            { name: "Shower Commodes" }, { name: "Static Commodes" },
            { name: "Urinals" }, { name: "Urinals & Bed Pans" }
          ]},
          { name: "Raised Toilet Seats" },
          { name: "Toilet Surrounds", children: [
            { name: "Toilet Frames With Seats" }, { name: "Toilet Frames Without Seats" }
          ]},
          { name: "Toilet Lifts" }
        ]
      },
      { name: "Washing & Hygiene", children: [{ name: "Washing Aids" }] },
    ]
  },
  {
    name: "Bedroom",
    icon: "bed",
    featured: { title: "Care Beds", tag: "New range", placeholder: "profiling bed" },
    children: [
      { name: "Mattresses", children: [{ name: "Airflow Mattresses" }, { name: "Mattress Protection" }] },
      { name: "Bedroom Accessories", children: [{ name: "Bed Rails" }, { name: "Bedroom Comfort" }] },
      { name: "Beds", children: [{ name: "Care Home/Nursing Beds" }, { name: "Side Rails/End Panels/Accessories" }] },
    ]
  },
  {
    name: "Furniture",
    icon: "chair",
    featured: { title: "Rise & Recliners", tag: "Best sellers", placeholder: "riser recliner chair" },
    children: [
      { name: "Seating", children: [
        { name: "Rise & Recliner Chairs", children: [
          { name: "4 Motor Riser Recliner" }, { name: "Bespoke" },
          { name: "Dual Motor Rise & Recliners" }, { name: "Single Motor Rise & Recliners" }
        ]},
        { name: "Fireside Chairs" }, { name: "High Dependency Chairs" },
        { name: "High Seat Chairs" },
        { name: "Sofas", children: [{ name: "Sofa Accessories" }] },
        { name: "Swivel Recliners" }
      ]},
      { name: "Furniture Accessories", children: [
        { name: "Chair Protection & Safety" }, { name: "Furniture Raisers" }
      ]},
      { name: "Footstools & Pouffes" },
      { name: "Privacy Screens" },
      { name: "Tables" },
    ]
  },
  {
    name: "Incontinence",
    icon: "drop",
    featured: { title: "Bed Pads", tag: "Subscribe & save", placeholder: "bed pad pack" },
    children: [
      { name: "Bed & House Protection" },
      { name: "Bed Pads", children: [{ name: "Disposable Bed Pads" }] },
      { name: "Single Use" },
      { name: "Washable" },
    ]
  },
  {
    name: "Living Aids",
    icon: "hand",
    featured: { title: "Kitchen Aids", tag: "Editor's pick", placeholder: "ergonomic cutlery" },
    children: [
      { name: "Sensory Aids", children: [
        { name: "Hearing Support", children: [{ name: "Amplified Telephones" }, { name: "Hearing Aids" }] },
        { name: "Visual Aids", children: [{ name: "Magnifiers" }, { name: "SAD Therapy" }] },
        { name: "Mats" }, { name: "Stimulation" }
      ]},
      { name: "Household Aids", children: [
        { name: "Anti-Slip" }, { name: "Clocks and Alarms" }, { name: "Half Steps" },
        { name: "Lighting" }, { name: "Perching Stools" }, { name: "Reaching Aids" },
        { name: "Safety" }, { name: "Stationery" }, { name: "Threshold Ramps" }
      ]},
      { name: "Kitchen Aids", children: [
        { name: "Appliances & Utensils" }, { name: "Beakers & Plates" }, { name: "Cutlery" },
        { name: "Food Preparation" }, { name: "Trolleys" }
      ]},
      { name: "Exercise & Rehabilitation", children: [
        { name: "Arthritis Supports" }, { name: "Changing Tables" }, { name: "Exercise Bands" },
        { name: "Gym Equipment" }, { name: "Hand Therapy" }, { name: "Medical Weighing Scales" },
        { name: "Pedal Exercisers" }, { name: "Showering" }, { name: "Therapy Benches" },
        { name: "Walking Aids" }
      ]},
      { name: "Out & About", children: [
        { name: "Blue Badge Holders" }, { name: "Car Travel Accessories" },
        { name: "Garden Aids" }, { name: "Keys & Turners" }
      ]},
      { name: "Comfort Living", children: [
        { name: "Comfort Aids & Clothing" },
        { name: "Cushions", children: [{ name: "Comfort Cushions" }, { name: "Pressure Care Cushions" }] },
        { name: "Foot Comfort" }, { name: "Heat Therapy" }
      ]},
      { name: "Dressing Aids" },
      { name: "Pharmaceutical Aids", children: [
        { name: "Massage Therapy" }, { name: "Medical Devices" },
        { name: "Natural Supplements" }, { name: "Pill Boxes/Cutters/Organisers" }
      ]},
      { name: "Hygiene Control", children: [{ name: "Personal Care" }, { name: "PPE" }] },
    ]
  },
  {
    name: "Mobility Scooters",
    icon: "scooter",
    featured: { title: "Travel Scooters", tag: "Fold & go", placeholder: "folding scooter" },
    children: [
      { name: "All Terrain Scooters" },
      { name: "Cabin Scooters" },
      { name: "Folding Scooters" },
      { name: "Pavement Scooters" },
      { name: "Road Scooters" },
      { name: "Travel Scooters" },
      { name: "Scooter Accessories", children: [
        { name: "Storage Solutions", children: [{ name: "Bags & Holders" }, { name: "Covers" }] },
        { name: "Ramps", children: [{ name: "Channel Ramps" }, { name: "Folding Ramps" }, { name: "Threshold Ramps" }] },
        { name: "Scooter Comfort" }, { name: "Scooter Safety & Protection" }, { name: "Wet Weather Wear" }
      ]},
      { name: "Batteries & Chargers", children: [
        { name: "Chargers", children: [{ name: "SLA Battery Chargers" }] }
      ]},
      { name: "Scooter Servicing", children: [{ name: "Scooter Insurance" }, { name: "Scooter Warranty" }] },
    ]
  },
  {
    name: "Moving & Handling",
    icon: "transfer",
    featured: { title: "Hoists", tag: "Care setting", placeholder: "patient hoist" },
    children: [
      { name: "Emergency Evacuation & Lifting" },
      { name: "Lifting Aids", children: [{ name: "Hoists" }] },
      { name: "Safe Handling Accessories" },
      { name: "Transfer Aids", children: [
        { name: "Slide Sheets" }, { name: "Slings & Harnesses" },
        { name: "Transfer Assists" }, { name: "Transfer Seats" }
      ]},
      { name: "Moving & Handling Servicing", children: [{ name: "Moving & Handling Warranty" }] },
    ]
  },
  {
    name: "Paediatrics",
    icon: "child",
    featured: { title: "Seating & Posture", tag: "Specialist", placeholder: "paediatric seating" },
    children: [
      { name: "Eating & Drinking" }, { name: "Mobility" },
      { name: "Seating & Posture" }, { name: "Supports" }
    ]
  },
  {
    name: "Powerchairs",
    icon: "powerchair",
    featured: { title: "Folding Powerchairs", tag: "Travel ready", placeholder: "folding powerchair" },
    children: [
      { name: "Fixed Base Powerchairs" }, { name: "Folding Powerchairs" },
      { name: "Powerchair Accessories" },
      { name: "Powerchair Servicing", children: [
        { name: "Powerchair Insurance" }, { name: "Powerchair Warranty" }
      ]}
    ]
  },
  {
    name: "Pressure Area Care",
    icon: "cushion",
    featured: { title: "Dynamic Mattresses", tag: "Clinical", placeholder: "pressure mattress" },
    children: [
      { name: "Cushions" },
      { name: "Mattresses", children: [{ name: "Dynamic Mattress" }] },
      { name: "Foot & Elbow Care" },
      { name: "Overlays" },
    ]
  },
  {
    name: "Walking Aids",
    icon: "stick",
    featured: { title: "Rollators", tag: "Independence", placeholder: "rollator" },
    children: [
      { name: "Rollators", children: [
        { name: "All Terrain" }, { name: "Bariatric" }, { name: "Forearm" },
        { name: "Hybrid Rollators" }, { name: "Standard Rollator" }
      ]},
      { name: "Crutches & Walking Sticks", children: [
        { name: "Crutches" }, { name: "Walking Sticks" }
      ]},
      { name: "Walking Frames", children: [
        { name: "Fixed Walking Frames" }, { name: "Folding Walking Frames" }
      ]},
      { name: "Tri-Walkers", children: [
        { name: "Standard Tri-Walkers" }, { name: "Tri-Walkers With Seats" }
      ]},
      { name: "Walking Aid Accessories" },
      { name: "Walking Aids Servicing", children: [{ name: "Walking Aid Insurance" }] },
    ]
  },
  {
    name: "Wheelchairs",
    icon: "wheelchair",
    featured: { title: "Travel Wheelchairs", tag: "Lightweight", placeholder: "travel wheelchair" },
    children: [
      { name: "Attendant Wheelchairs" }, { name: "Self-Propelled Wheelchairs" },
      { name: "Travel Wheelchairs" }, { name: "Specialist" },
      { name: "Wheelchair Accessories", children: [
        { name: "Ramps" }, { name: "Wheelchair Bags & Gloves" }, { name: "Wheelchair Cushions" },
        { name: "Wheelchair Powerpacks" }, { name: "Wheelchair Safety" }, { name: "Wheelchair Wet Weather" }
      ]},
      { name: "Wheelchair Servicing", children: [{ name: "Wheelchair Insurance" }] },
    ]
  },
  {
    name: "Specialist",
    icon: "specialist",
    featured: { title: "Bespoke Solutions", tag: "By assessment", placeholder: "specialist equipment" },
    children: [
      { name: "Bathroom Aids" }, { name: "Bedroom" }, { name: "Bedroom Accessories" },
      { name: "Furniture", children: [{ name: "Seating" }] },
      { name: "Moving & Handling" }, { name: "Paediatrics", children: [
        { name: "Bathroom Aids" }, { name: "Bedroom Aids" },
        { name: "Seating & Posture" }, { name: "Walking Aids" }
      ]},
      { name: "Powerchairs" }, { name: "Pressure Care" },
      { name: "Walking Aids" }, { name: "Wheelchairs" }, { name: "Misc", children: [{ name: "Other" }] },
    ]
  },
  {
    name: "Spare Parts",
    icon: "parts",
    featured: { title: "Find your part", tag: "Search by model", placeholder: "parts diagram" },
    children: [
      { name: "Bathroom Aids" }, { name: "Mobility Scooter" }, { name: "Other Furniture" },
      { name: "Paediatrics" }, { name: "Rise Recliners" }, { name: "Walking Aids" }, { name: "Wheelchairs" }
    ]
  },
  {
    name: "Service & Misc Items",
    icon: "service",
    featured: { title: "Servicing & Repair", tag: "Care plans", placeholder: "engineer at work" },
    children: [
      { name: "Miscellaneous Items" }, { name: "Service Items" }
    ]
  },
];

window.CATEGORIES = CATEGORIES;
