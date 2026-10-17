import { EXTERNAL_SCRIPTS, DEFAULTS } from "@/constants";

export class NotificationService {
  private isToastifyLoaded: boolean = false;

  async loadToastify() {
    if (this.isToastifyLoaded) {
      return;
    }

    return new Promise((resolve) => {
      const existingLink = document.querySelector(`link[href*="toastify"]`);

      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `${EXTERNAL_SCRIPTS.TOASTIFY}/src/toastify.min.css`;
        document.head.appendChild(link);
      }

      const existingScript = document.querySelector(`script[src*="toastify"]`);

      if (existingScript) {
        this.isToastifyLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `${EXTERNAL_SCRIPTS.TOASTIFY}`;
      script.onload = () => {
        this.isToastifyLoaded = true;
        resolve();
      };
      script.onerror = () => {
        this.isToastifyLoaded = true;
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  async show(message: string) {
    await this.loadToastify();

    if (typeof (window as any).Toastify !== "undefined") {
      (window as any)
        .Toastify({
          text: message,
          duration: DEFAULTS.TOAST_DURATION,
          gravity: "bottom",
          position: "center",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        })
        .showToast();
    }
  }
}
