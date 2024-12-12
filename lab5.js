const fs = require("fs");

//first
const storeStudentDetails = (filename, studentDetails) => {
  const data = studentDetails
    .map(
      (student) =>
        `${student.id},${student.name},${student.enrollmentNumber},${student.mobile},${student.department},${student.spi}`,
    )
    .join("\n");

  fs.writeFileSync(filename, data);
  console.log(`Student details stored in ${filename}`);
};

const students = [
  {
    id: 1,
    name: "Dhairya",
    enrollmentNumber: "24010101602",
    mobile: "9664847885",
    department: "CSE",
    spi: 8,
  },
  {
    id: 2,
    name: "Harpal",
    enrollmentNumber: "24010101642",
    mobile: "3462765382",
    department: "CSE",
    spi: 9.5,
  },
];

// storeStudentDetails('students.txt', students);

//second
const copyFileContent = (source, destination) => {
  fs.copyFileSync(source, destination);
  console.log(`Content copied from ${source} to ${destination}`);
};

// copyFileContent('students.txt', 'studentsCopy.txt');

//third
const countWords = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const words = content.split(/\s+/).filter((word) => word.length > 0);
  console.log(`Total words in ${filename} is: ${words.length}`);
};

// countWords('studentsCopy.txt');

//fourth
const countVowels = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const vowels = content.match(/[aeiouAEIOU]/g) || [];
  console.log(`Total vowels in ${filename} is: ${vowels.length}`);
};

// countVowels('studentsCopy.txt');

//fifth
const readStudentDetails = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const students = content.split("\n").map((data) => {
    const [id, name, enrollmentNumber, mobile, department, spi] =
      data.split(",");
    return {
      id,
      name,
      enrollmentNumber,
      mobile,
      department,
      spi: parseFloat(spi),
    };
  });
  console.log(students);
};

// readStudentDetails('students.txt');

//sixth
const filterLowSPIStudents = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const students = content.split("\n").map((data) => {
    const [id, name, enrollmentNumber, mobile, department, spi] =
      data.split(",");
    return {
      id,
      name,
      enrollmentNumber,
      mobile,
      department,
      spi: parseFloat(spi),
    };
  });

  const filteredStudents = students.filter((student) => student.spi < 5);
  console.log("Students with SPI less than 5:");
  console.log(filteredStudents);
};

// filterLowSPIStudents('students.txt');

// let a = students.reduce((acc,student)=>acc+=student.spi,0)
// console.log(a);
