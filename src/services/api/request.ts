interface BaseResponseData<T = any> {
  success: boolean;
  data: T | null;
  errorMessages?: string[];
}

const request = async <T = any>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<BaseResponseData<T>> => {
  try {
    const response = await fetch(input, init);
    const data = await response.json();
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { success: false, errorMessages: errorData?.messages, data: null };
      } catch (error: any) {
        return { success: false, errorMessages: [error?.message || error.toString()], data: null };
      }
    } else {
      return { success: true, data: data.data };
    }
  } catch (error) {
    throw new Error(`Network error ${error}`);
  }
};

export const get = async <T = any>(url: string): Promise<BaseResponseData<T>> => {
  return request(url);
};
