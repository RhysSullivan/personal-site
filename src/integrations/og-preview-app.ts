import { defineToolbarApp } from "astro/toolbar";

export default defineToolbarApp({
  init(canvas, app) {
    let container: HTMLElement | null = null;
    
    const getOgUrl = () => {
      const pathname = window.location.pathname;
      const slug = pathname.replace(/^\//, "").replace(/\/$/, "") || "index";
      return `/og/${slug}.png`;
    };
    
    const render = () => {
      const ogUrl = getOgUrl();
      
      if (!container) {
        container = document.createElement("astro-dev-toolbar-window");
        canvas.appendChild(container);
      }
      
      container.innerHTML = `
        <div style="padding: 16px; min-width: 400px;">
          <h2 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">OG Image Preview</h2>
          <img 
            src="${ogUrl}?t=${Date.now()}" 
            alt="OG Preview" 
            style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);"
          />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.6);">
            ${ogUrl}
          </p>
        </div>
      `;
    };

    app.onToggled(({ state }) => {
      if (state) {
        render();
      }
    });

    document.addEventListener("astro:page-load", () => {
      render();
    });
  },
});
