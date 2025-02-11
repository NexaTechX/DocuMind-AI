"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { queryDocument } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DocumentChatProps {
  content: string;
}

export function DocumentChat({ content }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await queryDocument(userMessage, content);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]" data-oid="w4bsxw-">
      <div className="p-4 border-b" data-oid="lyw9ko.">
        <h2 className="text-lg font-semibold" data-oid="gxaunlq">
          Chat with Document
        </h2>
        <p className="text-sm text-muted-foreground" data-oid="a3065vr">
          Ask questions about your document
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" data-oid="tgkj_wp">
        <div className="space-y-4" data-oid="_u6.fy6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.role === "assistant" ? "flex-row" : "flex-row-reverse"
              }`}
              data-oid="1rjtf10"
            >
              <div
                className={`p-2 rounded-lg max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
                data-oid="x70zngh"
              >
                <div
                  className="flex items-center gap-2 mb-1"
                  data-oid="6as8tgy"
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" data-oid="cawh4dj" />
                  ) : (
                    <User className="h-4 w-4" data-oid="07bjj2q" />
                  )}
                  <span className="text-xs font-medium" data-oid="oa:ldfc">
                    {message.role === "assistant" ? "AI Assistant" : "You"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap" data-oid="2f33vsb">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div
              className="flex items-center gap-2 text-muted-foreground"
              data-oid="p.tbxpp"
            >
              <Bot className="h-4 w-4 animate-spin" data-oid="h1s:bol" />
              <span className="text-sm" data-oid="p6jadju">
                Thinking...
              </span>
            </div>
          )}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t"
        data-oid="glj8ore"
      >
        <div className="flex gap-2" data-oid="ht2e1-:">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={loading}
            data-oid="uen488y"
          />

          <Button
            type="submit"
            disabled={loading || !input.trim()}
            data-oid="yn:qwgh"
          >
            <Send className="h-4 w-4" data-oid="vi2-rca" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
