export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  completionDate: string;
  client: string;
  details: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "downtown-office-renovation",
    title: "Downtown Office Building Renovation",
    shortDescription: "Complete plumbing system overhaul for a 5-story office complex",
    description: "Comprehensive bathroom and fixture modernization",
    image: "/project1.jpg",
    technologies: ["Copper Piping", "Smart Fixtures", "Water Recycling"],
    completionDate: "2024-06-15",
    client: "Downtown Enterprises LLC",
    details:
      "Renovated all 25 bathrooms in a 5-story downtown office building. Installed modern water-efficient fixtures, upgraded 3 miles of piping, and implemented a greywater recycling system. Project completed on time and under budget with zero disruption to ongoing business operations.",
  },
  {
    id: "2",
    slug: "residential-emergency-repair",
    title: "Emergency Burst Pipe Repair & Restoration",
    shortDescription: "Emergency response and restoration for water damage from burst pipes",
    description: "24/7 emergency repair and water damage restoration",
    image: "/project2.jpg",
    technologies: ["Diagnostic Testing", "Rapid Response", "Restoration"],
    completionDate: "2024-05-20",
    client: "Smith Family Residence",
    details:
      "Responded to emergency call within 30 minutes, identified burst pipe in main water line, performed repairs and complete water damage restoration. Coordinated with insurance company and restoration specialists. Restored full water service and prevented major structural damage.",
  },
  {
    id: "3",
    slug: "apartment-complex-upgrade",
    title: "Apartment Complex System Upgrade",
    shortDescription: "Complete plumbing upgrade for 50-unit residential complex",
    description: "Modern plumbing systems for new construction",
    image: "/project3.jpg",
    technologies: ["PEX Tubing", "Tankless Water Heaters", "Inspection Cameras"],
    completionDate: "2024-04-10",
    client: "Twin Oaks Apartments",
    details:
      "Installed complete plumbing infrastructure for 50-unit apartment complex. Installed 20 tankless water heaters, 3 miles of PEX tubing for improved water quality, and state-of-the-art inspection systems. Coordinated with construction team to ensure zero delays.",
  },
  {
    id: "4",
    slug: "drain-cleaning-maintenance",
    title: "Commercial Kitchen Drain System Cleaning",
    shortDescription: "Professional deep cleaning and maintenance of commercial kitchen drains",
    description: "Preventive maintenance for commercial establishments",
    image: "/project4.jpg",
    technologies: ["Hydro Jetting", "Video Inspection", "Preventive Maintenance"],
    completionDate: "2024-03-25",
    client: "Golden Fork Restaurant",
    details:
      "Performed comprehensive drain cleaning on a busy restaurant. Used hydro jetting to clear years of grease buildup, installed drain screens, and set up quarterly maintenance plan. Result: 99.9% uptime and no kitchen shutdown.",
  },
  {
    id: "5",
    slug: "new-home-plumbing",
    title: "New Home Complete Plumbing Installation",
    shortDescription: "Full plumbing system installation for custom-built single-family home",
    description: "Complete installation for new residential construction",
    image: "/project5.jpg",
    technologies: ["Custom Design", "Energy Efficient", "Code Compliance"],
    completionDate: "2024-02-14",
    client: "Anderson Custom Builders",
    details:
      "Designed and installed complete plumbing system for 4,000 sq ft custom home. Included 4 bathrooms, hot tub connection, radiant floor heating, and smart home plumbing features. All systems passed inspection on first attempt.",
  },
  {
    id: "6",
    slug: "commercial-building-renovation",
    title: "Hospital Wing Plumbing Renovation",
    shortDescription: "Specialized medical facility plumbing renovation",
    description: "Complex system for healthcare facility",
    image: "/project6.jpg",
    technologies: ["Backflow Prevention", "Sterile Systems", "Code Compliance"],
    completionDate: "2024-01-30",
    client: "St. Mary's Hospital",
    details:
      "Renovated plumbing systems in hospital surgical wing. Installed specialized backflow prevention systems, sterile water lines for medical equipment, and emergency shut-off systems. Maintained full facility operations during renovation. Surgeries continued without interruption.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
