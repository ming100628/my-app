let db = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export async function GET() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const number = db[0];
  db = db.slice(1, -1);
  console.log(db);
  return Response.json({ number: number });
}
