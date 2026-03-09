import type { ChannelMeta, ChannelPlugin, ClawdbotConfig } from "openclaw/plugin-sdk/dingtalk";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/dingtalk";
import type { ResolvedDingTalkAccount, DingTalkConfig } from "./types.js";

const meta: ChannelMeta = {
  id: "dingtalk",
  label: "DingTalk",
  selectionLabel: "DingTalk (钉钉)",
  docsPath: "/channels/dingtalk",
  docsLabel: "dingtalk",
  blurb: "DingTalk enterprise messaging with Stream mode.",
  aliases: ["dingding"],
  order: 70,
};

function resolveDingTalkConfig(cfg: ClawdbotConfig): DingTalkConfig {
  const raw = cfg.channels?.dingtalk;
  if (!raw || typeof raw !== "object") {
    return {};
  }
  return raw as DingTalkConfig;
}

export const dingtalkPlugin: ChannelPlugin<ResolvedDingTalkAccount> = {
  id: "dingtalk",
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
    markdown: true,
  },
  config: {
    resolveAccounts(cfg) {
      const dtConfig = resolveDingTalkConfig(cfg);
      const account: ResolvedDingTalkAccount = {
        accountId: DEFAULT_ACCOUNT_ID,
        enabled: dtConfig.enabled !== false,
        configured: Boolean(dtConfig.appKey && dtConfig.appSecret),
        appKey: dtConfig.appKey,
        appSecret: dtConfig.appSecret,
        robotCode: dtConfig.robotCode,
        connectionMode: dtConfig.connectionMode ?? "stream",
        config: dtConfig,
      };
      return [account];
    },
    resolveDefaultAccountId() {
      return DEFAULT_ACCOUNT_ID;
    },
  },
  security: {
    isAllowedSender(params) {
      const config = resolveDingTalkConfig(params.cfg);
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
      const config = resolveDingTalkConfig(cfg);
      return config.groupSessionScope ?? "group";
    },
    requireMention(cfg) {
      const config = resolveDingTalkConfig(cfg);
      return config.requireMention ?? true;
    },
  },
};
