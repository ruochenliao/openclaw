export type WeComConfig = {
  enabled?: boolean;
  corpId?: string;
  agentId?: number;
  secret?: string;
  token?: string;
  encodingAesKey?: string;
  webhookUrl?: string;
  dmPolicy?: "open" | "pairing" | "allowlist";
  allowFrom?: (string | number)[];
  groupPolicy?: "open" | "allowlist" | "disabled";
  groupAllowFrom?: (string | number)[];
  requireMention?: boolean;
  groupSessionScope?: "group" | "group_sender";
};

export type ResolvedWeComAccount = {
  accountId: string;
  enabled: boolean;
  configured: boolean;
  name?: string;
  corpId?: string;
  agentId?: number;
  secret?: string;
  token?: string;
  encodingAesKey?: string;
  config: WeComConfig;
};

export type WeComMessageContext = {
  chatId?: string;
  messageId: string;
  senderId: string;
  senderName?: string;
  isGroup: boolean;
  mentionedBot: boolean;
  content: string;
  msgType: "text" | "image" | "voice" | "video" | "file" | "markdown";
};

export type WeComSendResult = {
  errcode: number;
  errmsg: string;
  msgid?: string;
};

export type WeComAccessToken = {
  token: string;
  expiresAt: number;
};
