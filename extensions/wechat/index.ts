import type { OpenClawPluginApi } from "openclaw/plugin-sdk/wechat";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk/wechat";
import { wechatPlugin } from "./src/channel.js";

export { wechatPlugin } from "./src/channel.js";

const plugin = {
  id: "wechat",
  name: "WeChat",
  description: "WeChat personal messaging channel plugin (via wechaty)",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: wechatPlugin });
  },
};

export default plugin;
