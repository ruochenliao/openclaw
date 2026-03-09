export type QQConfig = {
  enabled?: boolean;
  appId?: string;
  appSecret?: string;
  token?: string;
  sandbox?: boolean;
  intents?: string[];
  dmPolicy?: "open" | "pairing" | "allowlist";
  allowFrom?: (string | number)[];
  groupPolicy?: "open" | "allowlist" | "disabled";
  groupAllowFrom?: (string | number)[];
  requireMention?: boolean;
  groupSessionScope?: "group" | "group_sender";
};

export type ResolvedQQAccount = {
  accountId: string;
  enabled: boolean;
  configured: boolean;
  name?: string;
  appId?: string;
  appSecret?: string;
  token?: string;
  sandbox: boolean;
  config: QQConfig;
};

export type QQMessageContext = {
  guildId?: string;
  channelId?: string;
  groupOpenId?: string;
  messageId: string;
  senderId: string;
  senderNickname?: string;
  isGroup: boolean;
  mentionedBot: boolean;
  content: string;
  msgType: "text" | "markdown" | "ark" | "embed" | "image" | "file" | "audio" | "video";
};

export type QQSendResult = {
  id?: string;
  timestamp?: string;
};

export type QQAccessToken = {
  token: string;
  expiresAt: number;
};

export type QQGatewayPayload = {
  op: number;
  d?: unknown;
  s?: number;
  t?: string;
};
