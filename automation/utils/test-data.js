export function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `testuser_${timestamp}_${random}@test.com`;
}

export function generateRandomUser() {
  const timestamp = Date.now();
  return {
    firstName: `Test${timestamp}`,
    lastName: `User${timestamp}`,
    email: generateRandomEmail(),
    telephone: `555${Math.floor(Math.random() * 10000000)}`,
    password: 'Test1234!',
    address: '123 Test Street',
    city: 'Test City',
    postCode: '12345',
    country: '222',
    region: '3513'
  };
}

export const testProducts = {
  macbookPro: 'MacBook Pro',
  samsungGalaxy: 'Samsung Galaxy Tab'
};

