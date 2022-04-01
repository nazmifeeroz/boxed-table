const useQueryParams = () => {
  const setQueryParams = (
    params: {
      key: string;
      value: string | number;
    }[]
  ) => {
    const url = new URL(window.location.href);
    url.search = "";

    const searchParams = new URLSearchParams("");

    for (const { key, value } of params) {
      searchParams.append(key, String(value));
    }

    const newPathUrl = url.toString() + "?" + searchParams.toString();

    window.history.pushState(null, "", newPathUrl);
  };

  const getParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const params = {} as { [key: string]: string };
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  return {
    setQueryParams,
    query: {
      params: getParams(),
    },
  };
};

export default useQueryParams;
