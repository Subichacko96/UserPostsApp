export default function handler(req, res) {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];
  
    if (req.method === "GET") {
      res.status(200).json(users);
    } else if (req.method === "POST") {
      // for demonstration, echo the request body back
      res.status(201).json(req.body);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  