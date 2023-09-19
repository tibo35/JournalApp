import { useState, useEffect } from "react";
type ServerResponse = any[] | { message: string };

type Item = {
  id: string;
  title: string;
};

function useItems(
  fetchItems: () => Promise<any[]>,
  postItem: (title: string) => Promise<any>,
  deleteItemApi: (id: string) => Promise<void> // Rename this
) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems()
      .then((data) => {
        if ("message" in data) {
          console.error(data.message);
          // Optionally, handle error state or notify user
        } else {
          setItems(
            data.map((item: any) => ({
              id: item._id,
              title: item.title,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [fetchItems]);

  const reorderItems = (from: number, to: number) => {
    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(from, 1);
    reorderedItems.splice(to, 0, movedItem);
    setItems(reorderedItems);
  };
  const addItem = (title: string) => {
    postItem(title).then((data) => {
      setItems((prev) => [...prev, { id: data._id, title: data.title }]);
    });
  };

  const deleteItem = (id: string) => {
    deleteItemApi(id).then(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return { items, addItem, deleteItem, reorderItems };
}

export default useItems;
