import { useState, FC, useEffect } from "react";
import { ListRenderItem, VirtualizedList } from "react-native";
import { Typography } from "../../res/typography";
import { SectionTitle } from "./SectionTitle";

interface ScrollState {
  end: boolean;
  data: Array<any>;
  page: number;
}

interface Props {
  fetchMore: (page: number) => Promise<Array<any>>;
  renderItem: ListRenderItem<any>;
}

const ScrollList = ({ fetchMore, renderItem }: Props) => {
  const [{ page, data, end }, setState] = useState<ScrollState>({
    data: [],
    page: 0,
    end: false,
  });

  useEffect(() => {
    let mounted = true;

    const loadMore = async () => {
      try {
        console.log("fetching more", page);
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
  }, [end, page, fetchMore]);

  useEffect(() => {
    console.log("init");
    setState({ data: [], end: false, page: 0 });
  }, [fetchMore]);

  const incPage = () =>
    setState(({ page, ...state }) => ({ ...state, page: page + 1 }));

  const refresh = () =>
    setState((state) => ({ ...state, end: false, page: 1 }));

  const doRenderItem = ({ item }: { item: any }) => {
    return renderItem(item);
  };

  if (data.length === 0) return <Typography>No search results</Typography>;
  // <SectionTitle text="Results" />
  return (
    <>
      <VirtualizedList
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item: any) => item?.id}
        getItemCount={(data) => data.length}
        getItem={(data, i) => data[i]}
        data={data}
        renderItem={doRenderItem}
        onEndReachedThreshold={0.1}
        onEndReached={incPage}
        onRefresh={refresh}
        refreshing={false}
      />
    </>
  );
};

export default ScrollList;
