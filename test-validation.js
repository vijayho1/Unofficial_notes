// Test cases for domain validation regex
const regex = /^[a-zA-Z0-9._%+-]+@kletech\.ac\.in$/;

const testCases = [
  { email: "user@kletech.ac.in", expected: true },
  { email: "john.doe@kletech.ac.in", expected: true },
  { email: "student123@kletech.ac.in", expected: true },
  { email: "user@gmail.com", expected: false },
  { email: "user@kletech.edu", expected: false },
  { email: "user@kletech.ac.in.fake", expected: false },
  { email: "@kletech.ac.in", expected: false },
  { email: "user@kletech.ac.in ", expected: false }, // trailing space
  { email: "user@kletech.AC.IN", expected: false }, // uppercase domain
];

console.log("Domain Validation Test Results:\n");
testCases.forEach(({ email, expected }) => {
  const result = regex.test(email);
  const status = result === expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${status}: "${email}" => ${result} (expected ${expected})`);
});
