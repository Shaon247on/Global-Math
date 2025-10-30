export interface Student {
  rank: number;
  id: string;
  name: string;
  xp: number;
  activeSubject: string;
  avatar?: string;
  attempted: number;
  averageScore: number;
}

export const dummyData: Student[] = [
  {
    rank: 1,
    id: "001",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "08",
    avatar:
      "https://i.pinimg.com/1200x/55/6c/e0/556ce07fa00cfcd61317270b7aa524a9.jpg",
    attempted: 15,
    averageScore: 92,
  },
  {
    rank: 2,
    id: "002",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "07",
    avatar:
      "https://i.pinimg.com/1200x/55/6c/e0/556ce07fa00cfcd61317270b7aa524a9.jpg",
    attempted: 12,
    averageScore: 88,
  },
  {
    rank: 3,
    id: "003",
    name: "Sophie Kate",
    xp: 560,
    activeSubject: "05",
    attempted: 14,
    averageScore: 91,
    avatar:
      "https://i.pinimg.com/1200x/55/6c/e0/556ce07fa00cfcd61317270b7aa524a9.jpg",
  },
  {
    rank: 4,
    id: "004",
    name: "Emma Grace",
    xp: 560,
    activeSubject: "09",
    attempted: 13,
    averageScore: 89,
    avatar:
      "https://i.pinimg.com/1200x/55/6c/e0/556ce07fa00cfcd61317270b7aa524a9.jpg",
  },
  {
    rank: 5,
    id: "005",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "08",
    attempted: 16,
    averageScore: 94,
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
  },
  {
    rank: 6,
    id: "006",
    name: "Ella Marie",
    xp: 560,
    activeSubject: "08",
    attempted: 10,
    averageScore: 85,
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
  },
  {
    rank: 7,
    id: "007",
    name: "Mia Belle",
    xp: 560,
    activeSubject: "12",
    attempted: 11,
    averageScore: 87,
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
  },
  {
    rank: 8,
    id: "008",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "08",
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
    attempted: 14,
    averageScore: 90,
  },
  {
    rank: 9,
    id: "009",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "08",
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
    attempted: 15,
    averageScore: 92,
  },
  {
    rank: 10,
    id: "010",
    name: "Simon Anderson",
    xp: 560,
    activeSubject: "08",
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
    attempted: 13,
    averageScore: 89,
  },
  {
    rank: 11,
    id: "011",
    name: "Oliver James",
    xp: 540,
    activeSubject: "06",
    attempted: 12,
    averageScore: 86,
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
  },
  {
    rank: 12,
    id: "012",
    name: "Ava Thompson",
    xp: 535,
    activeSubject: "07",
    attempted: 13,
    averageScore: 88,
    avatar:
      "https://i.pinimg.com/1200x/71/32/97/713297e7e191da9f8b858f9357160dc0.jpg",
  },
  {
    rank: 13,
    id: "013",
    name: "Lucas Brown",
    xp: 520,
    activeSubject: "05",
    attempted: 11,
    averageScore: 84,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 14,
    id: "014",
    name: "Isabella Wilson",
    xp: 515,
    activeSubject: "09",
    attempted: 14,
    averageScore: 90,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 15,
    id: "015",
    name: "Ethan Davis",
    xp: 510,
    activeSubject: "08",
    attempted: 12,
    averageScore: 87,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 16,
    id: "016",
    name: "Charlotte Lee",
    xp: 505,
    activeSubject: "07",
    attempted: 13,
    averageScore: 88,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 17,
    id: "017",
    name: "Mason White",
    xp: 500,
    activeSubject: "06",
    attempted: 10,
    averageScore: 83,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 18,
    id: "018",
    name: "Amelia Harris",
    xp: 495,
    activeSubject: "08",
    attempted: 14,
    averageScore: 89,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 19,
    id: "019",
    name: "Logan Martin",
    xp: 490,
    activeSubject: "05",
    attempted: 11,
    averageScore: 85,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 20,
    id: "020",
    name: "Harper Clark",
    xp: 485,
    activeSubject: "09",
    attempted: 13,
    averageScore: 87,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 21,
    id: "021",
    name: "Jackson Lewis",
    xp: 480,
    activeSubject: "07",
    attempted: 12,
    averageScore: 86,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 22,
    id: "022",
    name: "Evelyn Walker",
    xp: 475,
    activeSubject: "08",
    attempted: 11,
    averageScore: 84,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 23,
    id: "023",
    name: "Aiden Hall",
    xp: 470,
    activeSubject: "06",
    attempted: 10,
    averageScore: 82,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 24,
    id: "024",
    name: "Abigail Allen",
    xp: 465,
    activeSubject: "05",
    attempted: 12,
    averageScore: 85,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
  {
    rank: 25,
    id: "025",
    name: "Carter Young",
    xp: 460,
    activeSubject: "09",
    attempted: 11,
    averageScore: 83,
    avatar:
      "https://i.pinimg.com/736x/cf/41/f5/cf41f571523b1eec1d921c9427370fd0.jpg",
  },
];
