import { NextApiRequest, NextApiResponse } from "next";

type Image = { id: string; name: string; base64: string; type: string };

let images: Image[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { q } = req.query;
    const filteredImages = q
      ? images.filter(image =>
        image.name.toLowerCase().includes(
          Array.isArray(q) ? q[0].toLowerCase() : q.toLowerCase()
        )
      )
      : images;
    res.status(200).json(filteredImages);
    return;
  }

  if (req.method === 'POST') {
    const { name, base64, type } = req.body as Image;
    const newImage: Image = { id: Date.now().toString(), name, base64, type };
    images.push(newImage);
    res.status(201).json(newImage);
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const idStr = Array.isArray(id) ? id[0] : id;
    if (!idStr) {
      res.status(400).json({ error: "Missing id" });
      return;
    }
    images = images.filter(image => image.id !== idStr);
    res.status(204).end();
    return;
  }

  res.status(405).end();
}
