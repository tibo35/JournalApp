import React, { useState, useEffect } from "react";
import { fetchCategoryCount } from "../../Api/TasksAPI";

interface CategoryCounts {
  Urgent: number;
  Running: number;
  Ongoing: number;
}

export function useCategoryCount(cardId: string): CategoryCounts {
  const [categoryCount, setCategoryCount] = useState<CategoryCounts>({
    Urgent: 0,
    Running: 0,
    Ongoing: 0,
  });

  useEffect(() => {
    async function getCategoryCount() {
      try {
        const counts: { [key: string]: number } = await fetchCategoryCount(
          cardId
        );

        const formattedCounts: CategoryCounts = {
          Urgent: 0,
          Running: 0,
          Ongoing: 0,
        };

        for (let key in counts) {
          const formattedKey = (key.charAt(0) +
            key.slice(1).toLowerCase()) as keyof CategoryCounts;
          formattedCounts[formattedKey] = counts[key];
        }

        setCategoryCount(formattedCounts);
      } catch (error) {
        console.error("Error fetching category count:", error);
      }
    }
    getCategoryCount();
  }, [cardId]);

  return categoryCount;
}
