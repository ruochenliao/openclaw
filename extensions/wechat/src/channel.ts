import type { ChannelMeta, ChannelPlugin, ClawdbotConfig } from "openclaw/plugin-sdk/wechat";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/wechat";
import type { ResolvedWeChatAccount, WeChatConfig } from "./types.js";

const meta: ChannelMeta = {
  id: "wechat",
  label: "WeChat",
  selectionLabel: "WeChat (微信)",
  docsPath: "/channels/wechat",
  docsLabel: "wechat",
  blurb: "WeChat personal messaging via wechaty.",
  aliases: ["weixin"],
  order: 70,
};

function resolveWeChatConfig(cfg: ClawdbotConfig): WeChatConfig {
  const raw = cfg.channels?.wechat;
  if (!raw || typeof raw !== "object") {
    return {};
  }
  return raw as WeChatConfig;
}

export const wechatPlugin: ChannelPlugin<ResolvedWeChatAccount> = {
  id: "wechat",
  meta: { ...meta },
  capabilities: {
    text: true,
    image: true,
    audio: false,
    video: false,
    file: true,
    reactions: false,
    threads: false,
    mentions: true,
    groupChat: true,
    directMessage: true,
    editing: false,
    deletion: false,
  },
  config: {
    resolveAccounts(cfg) {
      const wechatConfig = resolveWeChatConfig(cfg);
      const account: ResolvedWeChatAccount = {
        accountId: DEFAULT_ACCOUNT_ID,
        enabled: wechatConfig.enabled !== false,
        configured: Boolean(wechatConfig.puppet || wechatConfig.puppetToken),
        puppet: wechatConfig.puppet ?? "wechaty-puppet-wechat4u",
        puppetToken: wechatConfig.puppetToken,
        config: wechatConfig,
      };
      return [account];
    },
    resolveDefaultAccountId() {
      return DEFAULT_ACCOUNT_ID;
    },
  },
  security: {
    isAllowedSender(params) {
      const config = resolveWeChatConfig(params.cfg);
      if (!params.isGroup) {
        if (config.dmPolicy === "open") return true;
        if (config.dmPolicy === "allowlist" && config.allowFrom) {
          return config.allowFrom.some((id) => String(id) === params.senderId);
        }
        return true;
      }
      if (config.groupPolicy === "disabled") return false;
      if (config.groupPolicy === "allowlist" && config.groupAllowFrom) {
        return config.groupAllowFrom.some((id) => String(id) === params.roomId);
      }
      return true;
    },
  },
  groups: {
    sessionScope(cfg) {
      const config = resolveWeChatConfig(cfg);
      return config.groupSessionScope ?? "group";
    },
    requireMention(cfg) {
      const config = resolveWeChatConfig(cfg);
      return config.requireMention ?? true;
    },
  },
};
