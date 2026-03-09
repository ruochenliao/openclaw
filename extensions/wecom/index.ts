import type { OpenClawPluginApi } from "openclaw/plugin-sdk/wecom";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk/wecom";
import { wecomPlugin } from "./src/channel.js";

export { wecomPlugin } from "./src/channel.js";

const plugin = {
  id: "wecom",
  name: "WeCom",
  description: "WeCom (企业微信) enterprise messaging channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: wecomPlugin });
  },
};

export default plugin;
