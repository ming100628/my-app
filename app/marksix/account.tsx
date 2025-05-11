import { CartProps } from "./interfaces";
import { renderColor } from "./numberFunctions";

export default ({ cart, setCart }: CartProps) => {
  function carRow(ticket: number[], index: number) {
    return (
      <div className="flex space-x-1" key={index}>
        {ticket.map((number, index) => (
          <div key={index}>{ballDiv(number)}</div>
        ))}
      </div>
    );
  }

  function ballDiv(ballNumber: number) {
    const text = renderColor(ballNumber, "text");
    const background = renderColor(ballNumber, "bg");
    const border = renderColor(ballNumber, "border");
    console.log("hloo");
    return (
      <div
        className={`cursor-pointer rounded-full border-2 ${text} ${background} ${border} w-10 h-10 flex items-center justify-center font-bold text-xl transition duration-500 ease-in-out`}
      >
        {ballNumber}
      </div>
    );
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <div className="items-center justify-center flex flex-col">
      <div className="h-12 bg-gray-400 flex items-center justify-center text-xl font-bold w-full">
        Account
      </div>
      <div className="font-bold lg:h-[calc(100vh-24rem)] overflow-auto py-2 w-full">
        <button
          className="bg-red-500 rounded-md text-white p-1 cursor-pointer w-full"
          onClick={emptyCart}
        >
          Reset Tickets
        </button>
        <div className="space-y-2 py-2">
          {cart.map((ticket, index) => carRow(ticket, index))}{" "}
        </div>
      </div>
    </div>
  );
};
