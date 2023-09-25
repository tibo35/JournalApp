import React from "react";
import ElementCard from "../Elements/ElementCard";

interface CardProps {
  title: string;
  id: string;
  taskCount: number;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

const TopicCard: React.FC<CardProps> = ({
  title,
  taskCount,
  id,
  onDelete,
  onOpen,
}) => (
  <ElementCard
    title={title}
    id={id}
    onDelete={onDelete}
    onOpen={onOpen}
    taskCount={taskCount}
  />
);

export default TopicCard;
