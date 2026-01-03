import axios from "axios";

export interface CheckResult {
  status: number;
  responseTime: number;
  isUp: boolean;
  errorMessage?: string;
}

export async function performApiCheck(url: string): Promise<CheckResult> {
  const start = Date.now();

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
    });

    return {
      status: response.status,
      responseTime: Date.now() - start,
      isUp: response.status >= 200 && response.status <= 300,
    };
  } catch (e: any) {
    return {
      status: 0,
      responseTime: Date.now() - start,
      isUp: false,
      errorMessage: e.message,
    };
  }
}
