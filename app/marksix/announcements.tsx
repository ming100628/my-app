import Carousel from "./carousel";
import DrawDate from "./drawDate";

export default () => {
  return (
    <div className="h-74 bg-gray-200 flex items-center">
      <DrawDate />
      <Carousel />
    </div>
  );
};
