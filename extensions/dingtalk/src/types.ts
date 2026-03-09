export type DingTalkConfig = {
  enabled?: boolean;
  appKey?: string;
  appSecret?: string;
  robotCode?: string;
  connectionMode?: "stream" | "webhook";
  webhookUrl?: string;
  dmPolicy?: "open" | "pairing" | "allowlist";
  allowFrom?: (string | number)[];
  groupPolicy?: "open" | "allowlist" | "disabled";
  groupAllowFrom?: (string | number)[];
  requireMention?: boolean;
  groupSessionScope?: "group" | "group_sender";
};

export type ResolvedDingTalkAccount = {
  accountId: string;
  enabled: boolean;
  configured: boolean;
  name?: string;
  appKey?: string;
  appSecret?: string;
  robotCode?: string;
  connectionMode: "stream" | "webhook";
  config: DingTalkConfig;
};

export type DingTalkMessageContext = {
  conversationId?: string;
  messageId: string;
  senderId: string;
  senderNick?: string;
  isGroup: boolean;
  mentionedBot: boolean;
  content: string;
  msgType: "text" | "richText" | "markdown" | "picture" | "file" | "audio" | "video";
  chatbotCorpId?: string;
  chatbotUserId?: string;
};

export type DingTalkSendResult = {
  processQueryKey?: string;
};

export type DingTalkAccessToken = {
  token: string;
  expiresAt: number;
};

export type DingTalkStreamEvent = {
  specVersion: string;
  type: string;
  headers: Record<string, string>;
  data: string;
};
