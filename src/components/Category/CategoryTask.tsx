import React, { useState, useEffect } from "react";
import { IonButton, IonRow, IonCol } from "@ionic/react";

interface CategoryProps {
  initialCategories?: string[];
  updateCategories?: (categories: string[]) => void;
}

const getColorForLabel = (
  label: string,
  isActive: boolean
): string | undefined => {
  if (!isActive) return "secondary";
  switch (label) {
    case "URGENT":
      return "danger";
    case "RUNNING":
      return "primary";
    case "ONGOING":
      return "success";
    default:
      return undefined;
  }
};

const ToggleButton: React.FC<{
  label: string;
  isActive: boolean;
  onToggle: (label: string) => void;
}> = ({ label, isActive, onToggle }) => {
  return (
    <IonButton
      color={getColorForLabel(label, isActive)}
      fill={isActive ? "solid" : "outline"}
      size="small"
      className="category-button"
      onClick={() => onToggle(label)}>
      {label}
    </IonButton>
  );
};

const CategoryTask: React.FC<CategoryProps> = ({
  initialCategories,
  updateCategories,
}) => {
  const [activeButtons, setActiveButtons] = useState<string[]>(
    initialCategories || []
  );

  useEffect(() => {
    if (updateCategories) {
      updateCategories(activeButtons);
    }
  }, [activeButtons, updateCategories]);

  const toggleButton = (buttonName: string) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons((prev) => prev.filter((btn) => btn !== buttonName));
    } else {
      setActiveButtons((prev) => [...prev, buttonName]);
    }
  };

  return (
    <IonRow className="category-row">
      <IonCol className="category-col">
        <ToggleButton
          label="URGENT"
          isActive={activeButtons.includes("URGENT")}
          onToggle={toggleButton}
        />
      </IonCol>
      <IonCol className="category-col">
        <ToggleButton
          label="RUNNING"
          isActive={activeButtons.includes("RUNNING")}
          onToggle={toggleButton}
        />
      </IonCol>
      <IonCol className="category-col">
        <ToggleButton
          label="ONGOING"
          isActive={activeButtons.includes("ONGOING")}
          onToggle={toggleButton}
        />
      </IonCol>
    </IonRow>
  );
};

export default CategoryTask;
