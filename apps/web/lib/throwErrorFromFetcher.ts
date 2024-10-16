export const throwErrorFromFetcher = (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    // let onError handle from hooks
    throw new Error();
  }
};
