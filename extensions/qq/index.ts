import type { OpenClawPluginApi } from "openclaw/plugin-sdk/qq";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk/qq";
import { qqPlugin } from "./src/channel.js";

export { qqPlugin } from "./src/channel.js";

const plugin = {
  id: "qq",
  name: "QQ",
  description: "QQ Bot Platform messaging channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: qqPlugin });
  },
};

export default plugin;
