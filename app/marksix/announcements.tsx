import Carousel from "./carousel";
import DrawDate from "./drawDate";
import { motion } from "framer-motion";
import { BGCOLORS, BORDERCOLORS } from "../utils/constants";
import { PastDraw } from "./interfaces";

export default function Announcements({
  pastDraws,
}: {
  pastDraws: PastDraw[];
}) {
  return (
    <div className="h-74 bg-gray-200 flex items-center">
      <DrawDate />
      <Carousel pastDraws={pastDraws} />
    </div>
  );
}
