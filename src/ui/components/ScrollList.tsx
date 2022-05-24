import { useState, useEffect, memo } from "react";
import { ListRenderItem, Text, FlatList } from "react-native";
import { Typography } from "../../res/typography";

interface ScrollState {
  end: boolean;
  data: Array<any>;
  page: number;
}

interface Props {
  fetchMore: (page: number) => Promise<Array<any>>;
  renderItem: ListRenderItem<any>;
}

const useIncrementalSearch = (
  fetchMore: (page: number) => Promise<Array<any>>,
  deps: Array<any>
) => {
  const [{ page, data, end }, setState] = useState<ScrollState>({
    data: [],
    page: 0,
    end: false,
  });

  useEffect(() => {
    let mounted = true;

    const loadMore = async () => {
      try {
        const more = await fetchMore(page);
        if (mounted) {
          if (more.length === 0) {
            setState((state) => ({ ...state, end: true }));
          } else {
            setState((state) => ({ ...state, data: [...state.data, ...more] }));
          }
        }
      } catch (e) {
        console.log(e.response?.data || e.message || e);
      }
    };

    if (!end && fetchMore) {
      loadMore();
    }
    return () => {
      mounted = false;
    };
  }, [end, page, ...deps]);

  useEffect(() => {
    setState({ data: [], end: false, page: 0 });
  }, deps);

  const nextPage = () =>
    setState(({ page, ...state }) => ({ ...state, page: page + 1 }));

  const refresh = () =>
    setState((state) => ({ ...state, end: false, page: 1 }));

  return { data, page, refresh, nextPage };
};

const ScrollList = ({ fetchMore, renderItem }: Props) => {
  const { data, refresh, nextPage } = useIncrementalSearch(fetchMore, [
    fetchMore,
  ]);

  if (data.length === 0) return <Typography>No search results</Typography>;
  // <SectionTitle text="Results" />
  return (
    <>
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={data}
        renderItem={({ item }: { item: any }) => {
          return renderItem(item);
        }}
        onEndReachedThreshold={0.1}
        onEndReached={nextPage}
        onRefresh={refresh}
        refreshing={false}
        ListFooterComponent={() => <Text>End of result </Text>}
      />
    </>
  );
};

export default memo(ScrollList);
