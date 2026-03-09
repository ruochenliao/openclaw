import type { BaseProbeResult } from "openclaw/plugin-sdk/wechat";

export type WeChatConfig = {
  enabled?: boolean;
  puppet?: string;
  puppetToken?: string;
  dmPolicy?: "open" | "pairing" | "allowlist";
  allowFrom?: (string | number)[];
  groupPolicy?: "open" | "allowlist" | "disabled";
  groupAllowFrom?: (string | number)[];
  requireMention?: boolean;
  groupSessionScope?: "group" | "group_sender";
};

export type ResolvedWeChatAccount = {
  accountId: string;
  enabled: boolean;
  configured: boolean;
  name?: string;
  puppet: string;
  puppetToken?: string;
  config: WeChatConfig;
};

export type WeChatMessageContext = {
  roomId?: string;
  messageId: string;
  senderId: string;
  senderName?: string;
  isGroup: boolean;
  mentionedBot: boolean;
  content: string;
  contentType: "text" | "image" | "file" | "voice" | "video";
};

export type WeChatSendResult = {
  messageId?: string;
};

export type WeChatProbeResult = BaseProbeResult<string> & {
  botName?: string;
  botId?: string;
};
