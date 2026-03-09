import type { ChannelMeta, ChannelPlugin, ClawdbotConfig } from "openclaw/plugin-sdk/wecom";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/wecom";
import type { ResolvedWeComAccount, WeComConfig } from "./types.js";

const meta: ChannelMeta = {
  id: "wecom",
  label: "WeCom",
  selectionLabel: "WeCom (企业微信)",
  docsPath: "/channels/wecom",
  docsLabel: "wecom",
  blurb: "WeCom/WeChat Work enterprise messaging.",
  aliases: ["wework", "wxwork"],
  order: 70,
};

function resolveWeComConfig(cfg: ClawdbotConfig): WeComConfig {
  const raw = cfg.channels?.wecom;
  if (!raw || typeof raw !== "object") {
    return {};
  }
  return raw as WeComConfig;
}

export const wecomPlugin: ChannelPlugin<ResolvedWeComAccount> = {
  id: "wecom",
  meta: { ...meta },
  capabilities: {
    text: true,
    image: true,
    audio: true,
    video: true,
    file: true,
    reactions: false,
    threads: false,
    mentions: true,
    groupChat: true,
    directMessage: true,
    editing: false,
    deletion: false,
    markdown: true,
  },
  config: {
    resolveAccounts(cfg) {
      const wecomConfig = resolveWeComConfig(cfg);
      const account: ResolvedWeComAccount = {
        accountId: DEFAULT_ACCOUNT_ID,
        enabled: wecomConfig.enabled !== false,
        configured: Boolean(wecomConfig.corpId && wecomConfig.secret),
        corpId: wecomConfig.corpId,
        agentId: wecomConfig.agentId,
        secret: wecomConfig.secret,
        token: wecomConfig.token,
        encodingAesKey: wecomConfig.encodingAesKey,
        config: wecomConfig,
      };
      return [account];
    },
    resolveDefaultAccountId() {
      return DEFAULT_ACCOUNT_ID;
    },
  },
  security: {
    isAllowedSender(params) {
      const config = resolveWeComConfig(params.cfg);
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
      const config = resolveWeComConfig(cfg);
      return config.groupSessionScope ?? "group";
    },
    requireMention(cfg) {
      const config = resolveWeComConfig(cfg);
      return config.requireMention ?? true;
    },
  },
};
