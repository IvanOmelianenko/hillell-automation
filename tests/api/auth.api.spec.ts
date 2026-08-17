import test, { expect } from "@playwright/test";
import { testUser1 } from "../../test-data/validUsers";

test.describe('Auth API', () => {
  test('Sign in', async ({ request }) => {
const responseAuth = await request.post('/api/auth/signin', {
  data: {
  'email': testUser1.email,
  'password': testUser1.password,
      }
   });
   const sid = responseAuth.headers()['set-cookie'].split(';')[0];
   expect(responseAuth.status()).toBe(200);
   expect(sid).toContain('sid=');
    });
});


