export interface Module {
  id: string;
  serial: string;
  moduleName: string;
  numberOfQuestions: number;
  quizAttended: number;
  average: number;
  topScore: number;
}


// Dummy data
export const moduleData: Module[] = [
  { id: "001", serial: "01", moduleName: "TECTONICS", numberOfQuestions: 340, quizAttended: 12893, average: 85, topScore: 99 },
  { id: "002", serial: "02", moduleName: "COASTS", numberOfQuestions: 340, quizAttended: 12893, average: 83, topScore: 97 },
  { id: "003", serial: "03", moduleName: "WATER CYCLE", numberOfQuestions: 340, quizAttended: 12893, average: 84, topScore: 98 },
  { id: "004", serial: "04", moduleName: "COLOMBIA", numberOfQuestions: 340, quizAttended: 12893, average: 82, topScore: 95 },
  { id: "005", serial: "05", moduleName: "GLOBALIZATION", numberOfQuestions: 340, quizAttended: 12893, average: 88, topScore: 100 },
  { id: "006", serial: "06", moduleName: "SUPERPOWERS", numberOfQuestions: 340, quizAttended: 12893, average: 86, topScore: 99 },
  { id: "007", serial: "07", moduleName: "MIGRATIONS", numberOfQuestions: 340, quizAttended: 12893, average: 84, topScore: 96 },
  { id: "008", serial: "08", moduleName: "MEXICO", numberOfQuestions: 340, quizAttended: 12893, average: 81, topScore: 93 },
  { id: "009", serial: "09", moduleName: "ARGENTINA", numberOfQuestions: 340, quizAttended: 12893, average: 82, topScore: 94 },
  { id: "010", serial: "10", moduleName: "BRAZIL", numberOfQuestions: 340, quizAttended: 12893, average: 85, topScore: 97 },
  { id: "011", serial: "11", moduleName: "GLACIERS", numberOfQuestions: 320, quizAttended: 11234, average: 79, topScore: 91 },
  { id: "012", serial: "12", moduleName: "DESERTS", numberOfQuestions: 310, quizAttended: 10987, average: 78, topScore: 90 },
  { id: "013", serial: "13", moduleName: "FORESTS", numberOfQuestions: 350, quizAttended: 13456, average: 88, topScore: 99 },
  { id: "014", serial: "14", moduleName: "URBANIZATION", numberOfQuestions: 330, quizAttended: 12567, average: 84, topScore: 95 },
  { id: "015", serial: "15", moduleName: "CLIMATE CHANGE", numberOfQuestions: 360, quizAttended: 14789, average: 89, topScore: 100 },
  { id: "016", serial: "16", moduleName: "OCEANS", numberOfQuestions: 340, quizAttended: 12890, average: 86, topScore: 98 },
  { id: "017", serial: "17", moduleName: "MOUNTAINS", numberOfQuestions: 315, quizAttended: 11456, average: 80, topScore: 92 },
  { id: "018", serial: "18", moduleName: "RIVERS", numberOfQuestions: 325, quizAttended: 12123, average: 83, topScore: 95 },
  { id: "019", serial: "19", moduleName: "AGRICULTURE", numberOfQuestions: 335, quizAttended: 12678, average: 85, topScore: 97 },
  { id: "020", serial: "20", moduleName: "ENERGY", numberOfQuestions: 345, quizAttended: 13234, average: 87, topScore: 99 },
];