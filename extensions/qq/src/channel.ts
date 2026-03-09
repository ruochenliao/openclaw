import type { ChannelMeta, ChannelPlugin, ClawdbotConfig } from "openclaw/plugin-sdk/qq";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/qq";
import type { ResolvedQQAccount, QQConfig } from "./types.js";

const meta: ChannelMeta = {
  id: "qq",
  label: "QQ",
  selectionLabel: "QQ (QQ机器人)",
  docsPath: "/channels/qq",
  docsLabel: "qq",
  blurb: "QQ Bot Platform messaging.",
  aliases: ["qqbot"],
  order: 70,
};

function resolveQQConfig(cfg: ClawdbotConfig): QQConfig {
  const raw = cfg.channels?.qq;
  if (!raw || typeof raw !== "object") {
    return {};
  }
  return raw as QQConfig;
}

export const qqPlugin: ChannelPlugin<ResolvedQQAccount> = {
  id: "qq",
  meta: { ...meta },
  capabilities: {
    text: true,
    image: true,
    audio: true,
    video: true,
    file: true,
    reactions: true,
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
      const qqConfig = resolveQQConfig(cfg);
      const account: ResolvedQQAccount = {
        accountId: DEFAULT_ACCOUNT_ID,
        enabled: qqConfig.enabled !== false,
        configured: Boolean(qqConfig.appId && qqConfig.appSecret),
        appId: qqConfig.appId,
        appSecret: qqConfig.appSecret,
        token: qqConfig.token,
        sandbox: qqConfig.sandbox ?? false,
        config: qqConfig,
      };
      return [account];
    },
    resolveDefaultAccountId() {
      return DEFAULT_ACCOUNT_ID;
    },
  },
  security: {
    isAllowedSender(params) {
      const config = resolveQQConfig(params.cfg);
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
      const config = resolveQQConfig(cfg);
      return config.groupSessionScope ?? "group";
    },
    requireMention(cfg) {
      const config = resolveQQConfig(cfg);
      return config.requireMention ?? true;
    },
  },
};
