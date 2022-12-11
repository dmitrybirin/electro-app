interface BaseResponseData<T = any> {
  success: boolean;
  data: T | null;
  errorMessage?: string;
}

const request = async <T = any>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<BaseResponseData<T>> => {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          errorMessage: errorData?.messages?.length
            ? errorData.messages.join('')
            : JSON.stringify(errorData),
          data: null,
        };
      } catch (error: any) {
        return { success: false, errorMessage: error?.message || error.toString(), data: null };
      }
    } else {
      const data = await response.json();
      return { success: true, data: data.data };
    }
  } catch (error) {
    throw new Error(`Network error ${error}`);
  }
};

export const get = async <T = any>(url: string): Promise<BaseResponseData<T>> => {
  return request(url);
};
