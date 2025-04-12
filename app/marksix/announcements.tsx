import Carousel from "./carousel";
import DrawDate from "./drawDate";

export default () => {
  return (
    <div className="px-50 py-8 h-80 w-screen bg-gray-200 flex items-center">
      <DrawDate />
      <Carousel />
    </div>
  );
};
