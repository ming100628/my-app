"use client";
export default ({
  balance,
  setBalance,
  tickets,
  setTickets,
}: {
  balance: number;
  setBalance: (balance: number) => void;
  tickets: number[][];
  setTickets: (tickets: number[][]) => void;
}) => {
  function purchase() {
    const ticket = tickets.find((ticket) => ticket.length < 6);
    if (ticket) {
      setTickets(tickets.filter((t) => t !== ticket));
      setBalance(balance - 10);
    } else {
      alert("No tickets available for purchase.");
    }
  }
  return (
    <>
      <div className="grow-3">
        Balance: {balance}
        <button className="h-4 w-130 bg-red-100">Add Selections</button>
        <button className="h-4 w-10 bg-red-100">Buy</button>
      </div>
      {tickets.map((ticket: number[], index: number) => (
        <div key={index}>
          {ticket.map((ball: number, ballIndex: number) => (
            <div
              key={ballIndex}
              className={`rounded-full border-4 bg-red-100 w-12 h-12 flex items-center justify-center font-bold text-xl`}
            >
              {ball}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
