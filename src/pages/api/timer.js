import { getCldImageUrl } from "next-cloudinary";
import fetch from "node-fetch"

export default async function GET(req, res) {
    const now = new Date();
    const targe_date_time = "2024-05-14T23:59:59";
    const time_left = new Date(targe_date_time).getTime() - now.getTime();
  
    const hours = Math.floor((time_left / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time_left / (1000 * 60 * 60 * 24));
    const seconds = Math.floor((time_left / 1000) % 60);
    const minutes = Math.floor((time_left / (1000 * 60)) % 60);

    const url = getCldImageUrl({
        src: "background_f90zkr",
        width: 600,
        height: 300,
        format: "jpg",
        overlays: [
          {
            text: {
              color: "rgb:FFFFFF",
              fontFamily: "Poppins",
              fontSize: 40,
              fontWeight: "bold",
              text: "¡Aprovecha el Hot Sale!",
            },
            position: {
              y: -50,
            },
          },
          {
            text: {
              color: "rgb:FFFFFF",
              fontFamily: "Lato",
              fontSize: 25,
              fontWeight: "bold",
              text: "Faltan:",
            },
            position: {
              y: -10,
            },
          },
          {
            text: {
              color: "rgb:FFFFFF",
              fontFamily: "Lato",
              fontSize: 25,
              fontWeight: "bold",
              text: `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`,
            },
            position: {
              y: 20,
            },
          },
        ],
      });

      const imageResponse = await fetch(url);
      const imageBuffer = await imageResponse.buffer();

      res.setHeader("Content-Type", imageResponse.headers.get("Content-Type"));
      res.setHeader("Content-Length", imageBuffer.length);
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  
      res.send(imageBuffer);
}