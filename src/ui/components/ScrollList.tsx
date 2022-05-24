import { memo, useEffect } from "react";
import { ListRenderItem, Text, FlatList } from "react-native";
import { Typography } from "../../res/typography";
import { useIncrementalSearch } from "../hooks/useIncrementalSearch";

interface Props {
  fetchMore: (page: number) => Promise<Array<any>>;
  renderItem: ListRenderItem<any>;
}

const ScrollList = ({ fetchMore, renderItem }: Props) => {
  const { data, search, nextPage } = useIncrementalSearch(fetchMore);

  useEffect(() => {
    search();
  }, []);

  return data.length === 0 ? (
    <Typography>No search results</Typography>
  ) : (
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
        onRefresh={() => null}
        refreshing={false}
        ListFooterComponent={() => <Text>End of result </Text>}
      />
    </>
  );
};

export default memo(ScrollList);
