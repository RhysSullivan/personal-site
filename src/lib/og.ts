import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export async function generateOgImage(title: string, description?: string, type?: string): Promise<Buffer> {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
  ).then((res) => res.arrayBuffer());

  const children: any[] = [
    {
      type: "div",
      props: {
        style: { display: "flex", alignItems: "center", gap: "12px" },
        children: [
          {
            type: "span",
            props: {
              style: { fontSize: "20px", color: "#a1a1aa" },
              children: "rhys.dev",
            },
          },
          ...(type && type !== "home" && type !== "section" ? [{
            type: "span",
            props: {
              style: { fontSize: "20px", color: "#525252" },
              children: `/ ${type}`,
            },
          }] : []),
        ],
      },
    },
    {
      type: "div",
      props: {
        style: { display: "flex", flexDirection: "column", gap: "16px" },
        children: [
          {
            type: "span",
            props: {
              style: { fontSize: "64px", fontWeight: 600, letterSpacing: "-0.03em", color: "#fafafa", lineHeight: 1.1 },
              children: title,
            },
          },
          ...(description ? [{
            type: "span",
            props: {
              style: { fontSize: "24px", color: "#a1a1aa", lineHeight: 1.4 },
              children: description,
            },
          }] : []),
        ],
      },
    },
  ];

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "60px",
        },
        children,
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}
