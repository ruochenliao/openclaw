import type { OpenClawPluginApi } from "openclaw/plugin-sdk/dingtalk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk/dingtalk";
import { dingtalkPlugin } from "./src/channel.js";

export { dingtalkPlugin } from "./src/channel.js";

const plugin = {
  id: "dingtalk",
  name: "DingTalk",
  description: "DingTalk (钉钉) enterprise messaging channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: dingtalkPlugin });
  },
};

export default plugin;
