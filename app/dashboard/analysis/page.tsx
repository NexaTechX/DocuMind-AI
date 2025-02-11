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
    <div className="space-y-6" data-oid="ykjflbd">
      <div className="flex justify-between items-center" data-oid="wdd2vn.">
        <div data-oid="wk19fu9">
          <h1 className="text-2xl font-bold" data-oid="j8eyl8a">
            Document Analysis
          </h1>
          <p className="text-muted-foreground" data-oid="8cpuver">
            Financial_Report_2024.pdf
          </p>
        </div>
        <div className="flex gap-2" data-oid="6sg0zxz">
          <Button variant="outline" className="gap-2" data-oid="k7j-vu1">
            <Share2 className="h-4 w-4" data-oid="b4o.970" />
            Share
          </Button>
          <Button variant="outline" className="gap-2" data-oid="spotqqt">
            <Download className="h-4 w-4" data-oid="::w33-i" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6" data-oid="8_r9tzb">
        <div className="md:col-span-2" data-oid="b9a954y">
          <Card data-oid=":wqsjzz">
            <CardHeader data-oid="a6cjibm">
              <CardTitle data-oid="dpjuzuk">Document Preview</CardTitle>
            </CardHeader>
            <CardContent data-oid="kq:ng4p">
              <div
                className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center"
                data-oid="zthzcuk"
              >
                Document Viewer
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6" data-oid="34-lhvs">
          <Card data-oid="foeomtz">
            <Tabs defaultValue="chat" data-oid="d__vsyh">
              <TabsList className="w-full" data-oid="32mrg5c">
                <TabsTrigger value="chat" className="flex-1" data-oid=".ago5l3">
                  <MessageSquare className="h-4 w-4 mr-2" data-oid="ch9uk55" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex-1"
                  data-oid="5grp9fq"
                >
                  <ListChecks className="h-4 w-4 mr-2" data-oid="s:.mx6i" />
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="flex-1"
                  data-oid="ssxx37."
                >
                  <BookOpen className="h-4 w-4 mr-2" data-oid="_2ycxqh" />
                  Summary
                </TabsTrigger>
              </TabsList>
              <CardContent className="mt-4" data-oid="8wcpshw">
                <TabsContent value="chat" data-oid="gc54ax9">
                  <div className="space-y-4" data-oid="k22r8te">
                    <div className="bg-muted p-4 rounded-lg" data-oid="s6tf_3u">
                      Ask questions about your document...
                    </div>
                    <div className="flex gap-2" data-oid="785.95b">
                      <input
                        type="text"
                        className="flex-1 rounded-md border p-2"
                        placeholder="Type your question..."
                        data-oid="bmdyfdh"
                      />

                      <Button data-oid="7q2ot4t">Ask</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insights" data-oid="dsl6gbe">
                  <div className="space-y-4" data-oid="zuzmwh8">
                    <div className="p-3 border rounded-lg" data-oid="nn1y.su">
                      <h4 className="font-medium" data-oid="5ipj8oj">
                        Key Findings
                      </h4>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid="qdh5:5l"
                      >
                        AI-generated insights will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="summary" data-oid="pvqv_kx">
                  <div className="space-y-4" data-oid="g8lh.ys">
                    <div className="p-3 border rounded-lg" data-oid="t:jkh4o">
                      <h4 className="font-medium" data-oid="g9ks.i9">
                        Executive Summary
                      </h4>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid="l7kkxgz"
                      >
                        Document summary will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <Card data-oid="v6vqi:b">
            <CardHeader data-oid="n6:1-in">
              <CardTitle className="text-sm font-medium" data-oid="0uzvq33">
                Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="p9ky2-s">
              <div className="flex items-center gap-2" data-oid="iznc5-z">
                <div className="flex -space-x-2" data-oid="x9afr.v">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                      data-oid="gh_um:y"
                    >
                      <Users className="h-4 w-4" data-oid="9fgxo:v" />
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" data-oid="q:ka.m.">
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
