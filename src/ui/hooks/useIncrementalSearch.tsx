import { useState, useEffect, useCallback } from "react";

interface SearchState {
  end: boolean;
  fetching: boolean;
  data: Array<any>;
  page: number;
  token: number;
}

export const useIncrementalSearch = (
  fetchMore: (page: number) => Promise<Array<any>>
) => {
  const [state, setState] = useState<SearchState>({
    data: [],
    page: -1,
    end: false,
    fetching: false,
    token: 0,
  });
  const { page, data, end, fetching, token } = state;
  const doFetchMore = useCallback(fetchMore, [token]);

  useEffect(() => {
    let mounted = true;
    const loadMore = async () => {
      try {
        if (page === 0) setState((state) => ({ ...state, fetching: true }));

        console.log("fetching", page);
        const more = await doFetchMore(page);
        console.log("done fetching", page);
        if (mounted) {
          if (more.length === 0) {
            setState((state) => ({ ...state, end: true, fetching: false }));
          } else {
            setState((state) => ({
              ...state,
              data:
                page === state.page && token === state.token
                  ? [...state.data, ...more]
                  : state.data,
              fetching: false,
            }));
          }
        }
      } catch (e) {
        console.log(e.response?.data || e.message || e);
        setState((state) => ({ ...state, fetching: false }));
      }
    };

    if (!end && page >= 0) loadMore();
    return () => {
      mounted = false;
    };
  }, [page, token]);

  const nextPage = () =>
    setState((state) => ({ ...state, page: 1 + state.page }));

  const search = () =>
    setState((state) => ({
      data: [],
      page: 0,
      end: false,
      fetching: false,
      token: state.token + 1,
    }));

  return { data, page, nextPage, search, fetching };
};
