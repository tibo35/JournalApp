import React from "react";
import ElementCard from "../Elements/ElementCard";

interface CardProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

const PhotoCard: React.FC<CardProps> = ({ title, id, onDelete, onOpen }) => (
  <ElementCard title={title} id={id} onDelete={onDelete} onOpen={onOpen} />
);

export default PhotoCard;
