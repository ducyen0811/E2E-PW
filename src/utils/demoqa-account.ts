import { request } from '@playwright/test';
import { ENV } from '../config/env';

export type DemoQaAccount = {
  userId: string;
  username: string;
  password: string;
  token: string;
};

function makeCredentials(): Pick<DemoQaAccount, 'username' | 'password'> {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  return {
    username: `e2e_${suffix}`,
    password: `P@ssw0rd${suffix}A`
  };
}

export async function createDemoQaAccount(): Promise<DemoQaAccount> {
  const { username, password } = makeCredentials();
  const api = await request.newContext({ baseURL: ENV.baseUrl });

  try {
    const createResponse = await api.post('/Account/v1/User', {
      data: {
        userName: username,
        password
      }
    });

    if (!createResponse.ok()) {
      throw new Error(
        `Create user failed: ${createResponse.status()} ${await createResponse.text()}`
      );
    }

    const created = await createResponse.json() as { userID?: string };
    if (!created.userID) {
      throw new Error(`Create user response has no userID: ${JSON.stringify(created)}`);
    }

    const tokenResponse = await api.post('/Account/v1/GenerateToken', {
      data: {
        userName: username,
        password
      }
    });

    if (!tokenResponse.ok()) {
      throw new Error(
        `Generate token failed: ${tokenResponse.status()} ${await tokenResponse.text()}`
      );
    }

    const tokenData = await tokenResponse.json() as { token?: string };
    if (!tokenData.token) {
      throw new Error(`Generate token response has no token: ${JSON.stringify(tokenData)}`);
    }

    return {
      userId: created.userID,
      username,
      password,
      token: tokenData.token
    };
  } finally {
    await api.dispose();
  }
}

export async function deleteDemoQaAccount(account?: DemoQaAccount): Promise<void> {
  if (!account?.userId || !account.token) return;

  const api = await request.newContext({
    baseURL: ENV.baseUrl,
    extraHTTPHeaders: {
      Authorization: `Bearer ${account.token}`
    }
  });

  try {
    await api.delete(`/Account/v1/User/${account.userId}`);
  } finally {
    await api.dispose();
  }
}
