export interface ModuleQuestion {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: "option1" | "option2" | "option3" | "option4";
}
export interface ModuleSet {
  id: string;
  name: string;
  optionalModule: string;
  questions: ModuleQuestion[];
}

export interface ModuleQuestion {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: "option1" | "option2" | "option3" | "option4";
}

export interface ModuleSet {
  id: string;
  name: string;
  optionalModule: string;
  questions: ModuleQuestion[];
}

export const moduleSets: ModuleSet[] = [
  {
    id: "set-001",
    name: "Techonics",
    optionalModule: "Earth Structure",
    questions: [
      {
        id: "q-001-1",
        question: "What causes tectonic plates to move?",
        option1: "Earth's rotation",
        option2: "Convection currents in the mantle",
        option3: "Magnetic field changes",
        option4: "Solar radiation",
        correctAnswer: "option2",
      },
      {
        id: "q-001-2",
        question: "What type of boundary forms mountains like the Himalayas?",
        option1: "Transform",
        option2: "Convergent",
        option3: "Divergent",
        option4: "Subduction",
        correctAnswer: "option2",
      },
      {
        id: "q-001-3",
        question: "Which layer of the Earth is liquid?",
        option1: "Inner core",
        option2: "Crust",
        option3: "Outer core",
        option4: "Mantle",
        correctAnswer: "option3",
      },
    ],
  },
  {
    id: "set-002",
    name: "Coasts",
    optionalModule: "",
    questions: [
      {
        id: "q-002-1",
        question: "What process erodes coastlines by the action of waves?",
        option1: "Abrasion",
        option2: "Evaporation",
        option3: "Condensation",
        option4: "Infiltration",
        correctAnswer: "option1",
      },
      {
        id: "q-002-2",
        question: "Which feature forms when a headland is eroded by waves?",
        option1: "Delta",
        option2: "Sea arch",
        option3: "Floodplain",
        option4: "Lagoon",
        correctAnswer: "option2",
      },
      {
        id: "q-002-3",
        question: "What type of coast is created by deposition?",
        option1: "Cliffed coast",
        option2: "Rocky coast",
        option3: "Beach coast",
        option4: "Delta coast",
        correctAnswer: "option3",
      },
    ],
  },
  {
    id: "set-003",
    name: "Water Cycle",
    optionalModule: "Hydrological Systems",
    questions: [
      {
        id: "q-003-1",
        question: "Which process converts water vapor into liquid?",
        option1: "Evaporation",
        option2: "Condensation",
        option3: "Transpiration",
        option4: "Sublimation",
        correctAnswer: "option2",
      },
      {
        id: "q-003-2",
        question: "Which part of the cycle returns water to the ocean?",
        option1: "Evaporation",
        option2: "Runoff",
        option3: "Condensation",
        option4: "Precipitation",
        correctAnswer: "option2",
      },
      {
        id: "q-003-3",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-4",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-5",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-6",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-7",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-8",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-9",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-10",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-11",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-12",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-13",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-14",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
      {
        id: "q-003-15",
        question: "Which factor mainly drives the water cycle?",
        option1: "Wind",
        option2: "Sun’s energy",
        option3: "Earth’s gravity",
        option4: "Ocean currents",
        correctAnswer: "option2",
      },
    ],
  },
  {
    id: "set-004",
    name: "Carbon Cycle",
    optionalModule: "",
    questions: [
      {
        id: "q-004-1",
        question: "What is the main greenhouse gas in the carbon cycle?",
        option1: "Nitrogen",
        option2: "Oxygen",
        option3: "Carbon dioxide",
        option4: "Methane",
        correctAnswer: "option3",
      },
      {
        id: "q-004-2",
        question: "Which process removes CO₂ from the atmosphere?",
        option1: "Respiration",
        option2: "Combustion",
        option3: "Photosynthesis",
        option4: "Decomposition",
        correctAnswer: "option3",
      },
      {
        id: "q-004-3",
        question: "Fossil fuel burning is part of which carbon process?",
        option1: "Carbon sequestration",
        option2: "Carbon release",
        option3: "Photosynthesis",
        option4: "Sedimentation",
        correctAnswer: "option2",
      },
    ],
  },
  {
    id: "set-005",
    name: "Globalization",
    optionalModule: "Economic Geography",
    questions: [
      {
        id: "q-005-1",
        question: "Which organization promotes global trade?",
        option1: "UNESCO",
        option2: "WTO",
        option3: "WHO",
        option4: "IMF",
        correctAnswer: "option2",
      },
      {
        id: "q-005-2",
        question: "Outsourcing is a result of what?",
        option1: "Protectionism",
        option2: "Trade barriers",
        option3: "Globalization",
        option4: "Regional isolation",
        correctAnswer: "option3",
      },
      {
        id: "q-005-3",
        question: "Which technology most supports globalization?",
        option1: "Blockchain",
        option2: "Telecommunication",
        option3: "Nanotechnology",
        option4: "Astronomy",
        correctAnswer: "option2",
      },
    ],
  },
  {
    id: "set-006",
    name: "Super powers",
    optionalModule: "",
    questions: [
      {
        id: "q-006-1",
        question: "Which country emerged as a superpower after World War II?",
        option1: "China",
        option2: "Germany",
        option3: "USA",
        option4: "France",
        correctAnswer: "option3",
      },
      {
        id: "q-006-2",
        question: "The Cold War was mainly between which two countries?",
        option1: "USA and USSR",
        option2: "USA and China",
        option3: "UK and France",
        option4: "Germany and Italy",
        correctAnswer: "option1",
      },
      {
        id: "q-006-3",
        question: "Soft power refers to influence through what means?",
        option1: "Military strength",
        option2: "Economic sanctions",
        option3: "Culture and diplomacy",
        option4: "Territorial control",
        correctAnswer: "option3",
      },
    ],
  },
  {
    id: "set-007",
    name: "Migrations",
    optionalModule: "",
    questions: [
      {
        id: "q-007-1",
        question: "Which of the following is a push factor for migration?",
        option1: "Better education",
        option2: "Job opportunities",
        option3: "Political instability",
        option4: "Peaceful environment",
        correctAnswer: "option3",
      },
      {
        id: "q-007-2",
        question: "Migration from rural to urban areas is called?",
        option1: "Urbanization",
        option2: "Emigration",
        option3: "Immigration",
        option4: "Circular migration",
        correctAnswer: "option1",
      },
      {
        id: "q-007-3",
        question: "Remittances are funds sent by migrants to where?",
        option1: "Employers",
        option2: "Governments",
        option3: "Home countries",
        option4: "Charity organizations",
        correctAnswer: "option3",
      },
    ],
  },
  {
    id: "set-008",
    name: "Regenerating Places",
    optionalModule: "",
    questions: [
      {
        id: "q-008-1",
        question: "What is urban regeneration primarily aimed at?",
        option1: "Destroying old areas",
        option2: "Revitalizing declining areas",
        option3: "Building new cities",
        option4: "Increasing population density",
        correctAnswer: "option2",
      },
      {
        id: "q-008-2",
        question: "Which of the following is a key component of regeneration?",
        option1: "Community involvement",
        option2: "Isolation",
        option3: "Deforestation",
        option4: "Privatization only",
        correctAnswer: "option1",
      },
      {
        id: "q-008-3",
        question: "Which city is known for major regeneration in Docklands?",
        option1: "New York",
        option2: "London",
        option3: "Tokyo",
        option4: "Paris",
        correctAnswer: "option2",
      },
    ],
  },
];
