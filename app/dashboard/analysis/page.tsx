"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  ListChecks,
  BookOpen,
  Users,
  Share2,
  Download,
} from "lucide-react";

export default function DocumentAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Document Analysis</h1>
          <p className="text-muted-foreground">Financial_Report_2024.pdf</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                Document Viewer
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <Tabs defaultValue="chat">
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex-1">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex-1">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Summary
                </TabsTrigger>
              </TabsList>
              <CardContent className="mt-4">
                <TabsContent value="chat">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      Ask questions about your document...
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 rounded-md border p-2"
                        placeholder="Type your question..."
                      />

                      <Button>Ask</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insights">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Key Findings</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-generated insights will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="summary">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Executive Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        Document summary will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                    >
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm">
                  Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
